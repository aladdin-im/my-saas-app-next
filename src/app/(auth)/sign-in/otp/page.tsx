"use client"

import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { siteConfig } from "@/config/index"
import { authClient } from "@/lib/auth-client"
import { ArrowLeftIcon, LoaderCircleIcon } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "sonner"

const OTP_LENGTH = 6

function getOtpErrorMessage(err: { code?: string; message?: string }) {
    switch (err.code) {
        case "INVALID_OTP": return "Verification code is incorrect."
        case "OTP_EXPIRED": return "Verification code has expired."
        case "TOO_MANY_ATTEMPTS": return "Too many failed attempts."
        default: return err.message ?? "Verification failed."
    }
}

export default function OtpPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") ?? ""

    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)

    if (!email) {
        router.replace("/sign-in")
        return null
    }

    const handleVerify = useCallback(async (code: string) => {
        if (loading) return
        setError("")
        setLoading(true)
        const { error: err } = await authClient.signIn.emailOtp({
            email,
            otp: code,
        })
        setLoading(false)
        if (err) {
            setOtp("")
            setError(getOtpErrorMessage(err))
            return
        }
        router.push("/")
    }, [email, router])

    const handleChange = (value: string) => {
        setOtp(value)
        if (error) setError("")
        if (value.length === OTP_LENGTH) {
            handleVerify(value)
        }
    }

    const handleResend = async () => {
        setResending(true)
        setError("")
        setOtp("")
        const { error: err } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "sign-in",
        })
        setResending(false)
        if (err) {
            setError(err.message ?? "Failed to resend verification code")
            return
        }
        toast.success("Verification code resent")
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="text-primary-foreground flex size-6 items-center justify-center">
                            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                        </div>
                        {siteConfig.name}
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex w-full max-w-xs flex-col items-center gap-8">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">Enter the code</h1>
                            <p className="text-muted-foreground text-sm">
                                We sent a verification code to{" "}
                                <strong className="text-foreground">{email}</strong>
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <InputOTP
                                maxLength={OTP_LENGTH}
                                value={otp}
                                onChange={handleChange}
                                disabled={loading}
                                autoFocus
                            >
                                <InputOTPGroup className="gap-2">
                                    {Array.from({ length: OTP_LENGTH }, (_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="h-12 w-12 rounded-lg border text-lg"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>

                            {error && (
                                <p className="text-destructive text-center text-sm">{error}</p>
                            )}
                        </div>

                        <div className="flex w-full flex-col gap-4">
                            <Button
                                type="button"
                                className="w-full"
                                disabled={loading || otp.length < OTP_LENGTH}
                                onClick={() => handleVerify(otp)}
                            >
                                {loading && <LoaderCircleIcon className="size-4 animate-spin" />}
                                {loading ? "Verifying..." : "Continue"}
                            </Button>
                        </div>

                        <div className="flex w-full items-center justify-between text-sm">
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                                onClick={() => router.back()}
                            >
                                <ArrowLeftIcon className="size-3.5" />
                                Back
                            </button>
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors disabled:opacity-50"
                                onClick={handleResend}
                                disabled={resending || loading}
                            >
                                {resending ? "Sending..." : "Resend code"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/images/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
