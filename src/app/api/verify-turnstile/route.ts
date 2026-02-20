import { NextRequest, NextResponse } from "next/server"

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export async function POST(request: NextRequest) {
    const { token } = await request.json() as { token: string }

    if (!token) {
        return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 })
    }

    const res = await fetch(TURNSTILE_VERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY!,
            response: token,
        }),
    })

    const data = await res.json() as { success: boolean }

    if (!data.success) {
        return NextResponse.json({ success: false, error: "Turnstile verification failed" }, { status: 403 })
    }

    return NextResponse.json({ success: true })
}
