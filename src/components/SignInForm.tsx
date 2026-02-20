"use client"

import { GithubIcon, GoogleIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/index"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"

export function SignInForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [turnstileToken, setTurnstileToken] = useState("")
    const turnstileRef = useRef<TurnstileInstance>(null)

    const handleSignInWithGitHub = () => {
        authClient.signIn.social({
            provider: "github",
            callbackURL: "/"
        })
    }

    const handleSignInWithGoogle = () => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !turnstileToken) return
        setLoading(true)

        const verifyRes = await fetch("/api/verify-turnstile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: turnstileToken }),
        })
        if (!verifyRes.ok) {
            setLoading(false)
            turnstileRef.current?.reset()
            setTurnstileToken("")
            toast.error("Human verification failed. Please try again.")
            return
        }

        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "sign-in",
        })
        setLoading(false)
        if (error) {
            turnstileRef.current?.reset()
            setTurnstileToken("")
            toast.error(error.message ?? "Failed to send verification code")
            return
        }
        toast.success("Verification code sent to your email")
        router.push(`/sign-in/otp?email=${encodeURIComponent(email)}`)
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Join {siteConfig.name}</h1>
                </div>
                <Field>
                    <Button variant="outline" size="lg" type="button" onClick={handleSignInWithGitHub}>
                        <GithubIcon />
                        Continue with GitHub
                    </Button>
                    <Button variant="outline" size="lg" type="button" onClick={handleSignInWithGoogle}>
                        <GoogleIcon />
                        Continue with Google
                    </Button>
                </Field>
                <FieldSeparator>or</FieldSeparator>
                <Field>
                    <Input
                        id="email"
                        type="email"
                        className="h-10"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <div className="flex justify-center">
                        <Turnstile
                            ref={turnstileRef}
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                            onSuccess={setTurnstileToken}
                            onExpire={() => setTurnstileToken("")}
                            options={{ size: "flexible" }}
                        />
                    </div>
                </Field>
                <Field>
                    <Button type="submit" size="lg" disabled={loading || !turnstileToken}>
                        {loading ? "Sending..." : "Continue"}
                    </Button>
                    <FieldDescription className="text-center">
                        By continuing, you agree to the {" "}
                        <a href="/terms" className="underline underline-offset-4">
                            Terms,
                        </a>
                        {" "}
                        <a href="/privacy" className="underline underline-offset-4">
                            Privacy,
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
