import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
const pool = require('@/lib/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookie = require('cookie');

export async function POST(
    req: Request, res: NextApiResponse
) {

    try {
        const { email, password } = await req.json()

        let data: QueryResult = await pool.query('SELECT * FROM staff_accounts WHERE email = $1', [email]);

        if (data.rows.length > 0) {
            const staff = data.rows[0];
            const passwordMatch = await bcrypt.compare(password, staff.password_hash);

            if (passwordMatch) {
                const token = jwt.sign({
                    id: staff.id
                }, process.env.JWT_SECRET, { expiresIn: '1d' });

                const serialized = cookie.serialize(
                    'token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'strict',
                    path: "/"
                }
                )
                return NextResponse.json({ message: "Login success", staff, token }, { headers: { 'Set-Cookie': serialized } });
            } else {
                return NextResponse.json({ message: "Incorrect password" }, { status: 402 });
            }
        } else {
            return NextResponse.json({ message: 'Staff not found' }, { status: 404 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Failed' }, { status: 400 });
    }
}




