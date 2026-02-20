import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ["/settings/:path*"], // Specify the routes the middleware applies to
};