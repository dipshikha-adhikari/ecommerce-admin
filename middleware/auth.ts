import { getUser } from "@/utils/get-user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export default async function authMiddleware(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const user = await getUser(token)
    if (!user) {
        return NextResponse.redirect(`${process.env.BASE_URL}/auth/sign-in`)
    }
    return NextResponse.next()
}