import { getImageUrl } from "@/utils/imageUrl";
import { Product } from "./createProduct";

export const createImage = async (data: Product) => {

    let imageData = typeof data.coverImage === 'string' ? { url: data.coverImage } : await getImageUrl(data?.coverImage)

    const response = await fetch(`${process.env.BASE_URL}/api/products/cover_images`, {
        method: "POST",
        body: JSON.stringify({ ...imageData, created_by: data.staffId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw error with the message from the server
    }

    return response.json()
}