import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./utils/get-user";

export async function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const user = await getUser(token)
    if (!user) {
        return NextResponse.redirect(`${process.env.BASE_URL}/auth/sign-in`)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/:path', '/account', '/overview', '/products/create'],
}