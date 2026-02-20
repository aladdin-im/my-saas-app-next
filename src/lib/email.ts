import OtpEmail from "@/emails/otp"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOtpEmail(email: string, otp: string, expiresInMinutes: number) {
    return resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "Your sign-in code",
        react: OtpEmail({ otp, expiresInMinutes }),
    })
}
