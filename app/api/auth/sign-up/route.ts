import { NextResponse } from "next/server";
import { QueryResult } from "pg";

const bcrypt = require("bcrypt");
const pool = require('@/lib/db')
const saltRounds = 10;

export async function POST(
    req: Request,
    res: Response
) {
    try {

        let { fullname, email, password, roleId, staffId }: any = await req.json()

        if (!fullname || !email || !password || !roleId || !staffId) {
            return new NextResponse('Fill all the input fields', { status: 400 })
        }

        const checkQuery = "SELECT * FROM staff_accounts where email = $1";

        const alreadyExist: QueryResult = await pool.query(checkQuery, [email])

        if (alreadyExist.rows.length > 0) {
            return NextResponse.json({ message: 'Staff with this email already exists' }, { status: 400 })
        }
        if (!validateEmail(email)) {
            return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
        }
        if (!validateStaff(staffId, roleId, email)) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }
        bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {
            if (err) return NextResponse.json({ message: err }, { status: 400 });
            const insertQuery = "INSERT INTO staff_accounts ( email, password_hash, fullname, role_id) VALUES ($1, $2, $3, $4)";
            await pool.query(insertQuery, [email, hash, fullname, roleId])
        });
        return NextResponse.json({ message: 'Staff account successfully created' });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to create staff account' }, { status: 400 })
    }
}


function validateEmail(email: string) {
    const containsUppercase = /[A-Z]/.test(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/;

    if (containsUppercase) {
        return false;
    }
    return emailRegex.test(email);
}

function validateStaff(id: number, roleId: number, email: string) {
    let exist = staffs.some(staff => staff.id === id && staff.roleId === roleId && staff.email === email)
    return exist
}

let staffs = [
    {
        id: 1,
        email: 'akbivash@gmail.com',
        roleId: 2,
    }
]