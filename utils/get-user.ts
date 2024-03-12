import { IUser } from "@/app/_types";
import { cookies } from "next/headers";

export async function getUser(token?: string | undefined | null): Promise<IUser | null> {
    const cookiesStore = cookies();
    const tokenString = token || cookiesStore.get('token')?.value?.toString(); // Use optional chaining to safely access value
    const headers = tokenString ? { Authorization: tokenString } : undefined; // Check if tokenString is defined

    const res = await fetch(`${process.env.BASE_URL}/api/auth/user`, {
        headers: headers,
    });

    if (res.ok) {
        return res.json();
    }

    return null;
}
