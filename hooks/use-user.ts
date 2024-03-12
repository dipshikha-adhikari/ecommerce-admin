import { IUser } from "@/app/_types"
import { useQuery } from "react-query"

type UserData = {
    data: IUser
    isLoading: boolean
}

export const useUser = (): UserData => {
    const { data, isLoading } = useQuery('user', async () => {
        const result = await fetch(`${process.env.BASE_URL}/api/auth/user`)
        return result.json()
    })

    return { data, isLoading }
}