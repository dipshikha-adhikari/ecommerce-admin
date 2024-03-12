import { getUser } from "@/utils/get-user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
const pool = require('@/lib/db')

export async function GET(
    req: Request, { params }: { params: { id: string } }
) {

    try {

        const result: QueryResult = await pool.query(`select * from products where id = $1`, [params.id])

        return NextResponse.json(result.rows, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Failed' }, { status: 400 });
    }
}

export async function PUT(
    req: Request, { params }: { params: { id: string } }
) {

    try {
        const user = await getUser()
        // const { description, name, price, cover_image, tax, discount }: IProducts = await req.json()

        // let queryString = 'update products set '
        // const paramsArray: any = []
        // if (name) {
        //     queryString += 'name = $' + paramsArray.push(name)
        // }
        // let query = queryString + ` where id = ${params.id}`
        // const result: QueryResult = await pool.query(query, paramsArray)
        // return NextResponse.json(result.rows, { status: 200 });
        return NextResponse.json({ ms: ' res' }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Failed' }, { status: 400 });
    }
}