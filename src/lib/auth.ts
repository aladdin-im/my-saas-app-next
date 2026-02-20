import { getDb } from "@/db";
import { sendOtpEmail } from "@/lib/email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
    database: drizzleAdapter(await getDb(), {
        provider: "pg",
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    plugins: [
        admin(),
        emailOTP({
            otpLength: 6,
            expiresIn: 5 * 60, // 5 minutes
            allowedAttempts: 3,
            async sendVerificationOTP({ email, otp }) {
                await sendOtpEmail(email, otp, 5);
            },
        })
    ],
});