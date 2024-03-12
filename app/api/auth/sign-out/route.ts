import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export default (req: NextRequest, res: NextResponse) => {
    cookies().delete('name')
}