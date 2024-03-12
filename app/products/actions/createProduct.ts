import { ProductSchemaType } from "../create/page";
import { createImage } from "./createImage";

export interface Product extends ProductSchemaType {
    coverImage: string | FileList
    categoryId: number
    staffId: number
}


export const createProduct = async (data: Product) => {

    let image = await createImage(data)

    let verifiedData = {
        cover_image: image.id, //image id,url
        category_id: data.categoryId,
        discount: data.discount,
        name: data.name,
        description: data.description,
        price: data.price,
        staff_id: data.staffId
    }

    const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(verifiedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw error with the message from the server
    }

    return await response.json();
};

