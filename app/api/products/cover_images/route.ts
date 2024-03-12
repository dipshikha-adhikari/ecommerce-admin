import { getUser } from "@/utils/get-user";
import { NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";
const pool = require('@/lib/db')

export async function POST(
    req: NextRequest,
) {
    try {
        const user = await getUser()
        if (!user) {
            return NextResponse.json({ message: "You are not a staff" }, { status: 400 });
        }
        const { publicId = null, url } = await req.json()
        const query = `insert into cover_images (public_id,url, created_by) values($1, $2,$3) RETURNING id`
        let res: QueryResult = await pool.query(query, [publicId, url, user.id])
        return NextResponse.json({ id: res.rows[0].id }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Failed' }, { status: 400 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const query = `select * from cover_images`
        let res: QueryResult = await pool.query(query)
        return NextResponse.json(res.rows, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Failed' }, { status: 400 });
    }
}




