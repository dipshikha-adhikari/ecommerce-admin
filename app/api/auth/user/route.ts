import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";
const jwt = require('jsonwebtoken')
const pool = require('@/lib/db')

export async function GET(req: NextRequest) {
    try {
        const authorizationHeader = req.headers.get('Authorization');
        const cookiesStore = cookies()
        let token: any = cookiesStore.get('token')?.value.toString()
        if (!authorizationHeader && !token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        token = token ? token : authorizationHeader?.replace('Bearer ', '')

        if (!token) {
            return NextResponse.json({ message: 'You are not authenticated' }, { status: 400 });
        }

        let decodedData: any;

        try {
            decodedData = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        } catch (err) {
            console.log(err)
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        }

        const query = `SELECT sa.email, sa.phone_number, sa.image, sa.id, r.role_name
                       FROM staff_accounts sa
                       JOIN roles r ON sa.role_id = r.id`;

        const user: QueryResult = await pool.query(query);
        if (!user.rows.length) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        return NextResponse.json(user.rows[0], { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to get user' }, { status: 400 });
    }
}
