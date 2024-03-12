import { NextResponse } from "next/server";
import { QueryResult } from "pg";
const pool = require('@/lib/db')

export async function GET() {
    try {
        const results: QueryResult = await pool.query('select * from staff_accounts')
        return NextResponse.json(results.rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err }, { status: 400 });
    }
}

