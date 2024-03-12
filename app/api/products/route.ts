import { getUser } from "@/utils/get-user";
import { NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";
const pool = require('@/lib/db')

export async function POST(
    req: Request,
) {
    try {
        const user = await getUser()

        if (!user) {
            return NextResponse.json({ message: "You are not a staff" }, { status: 400 });
        }

        const { name, description, cover_image, discount, tax, price, category_id }: IProducts = await req.json()

        const query = `insert into products (created_by, name, description, price, discount, category_id, cover_image , tax ) values($1, $2, $3, $4, $5, $6, $7, $8)`
        await pool.query(query, [user.id, name, description, price, discount, category_id, cover_image, tax])
        return NextResponse.json({ message: "Successfully created new product" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err }, { status: 400 });
    }
}




export async function GET(
    req: NextRequest
) {
    try {
        const { searchParams } = new URL(req.url)
        const staff_id = searchParams.get('staff_id')

        const query = `select * from products where created_by = $1`
        const products: QueryResult = await pool.query(query, [staff_id])
        if (products.rows.length) {
            return NextResponse.json(products.rows, { status: 200 });
        }

        return NextResponse.json({ message: 'No products found' }, { status: 200 });
    } catch (err) {
        // console.log(err);
        return NextResponse.json({ message: 'Failed to get products' }, { status: 400 });
    }
}