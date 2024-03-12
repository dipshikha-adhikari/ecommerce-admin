"use client";
import { Button } from "@/components/elements/button";
import CategoryWrapper from "@/components/elements/category-wrapper";
import ImageUpload from "@/components/forms/image-upload";
import { InputField } from "@/components/forms/input-field";
import { TextAreaField } from "@/components/forms/textarea";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
import { createProduct } from "../actions/createProduct";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  tax: z.coerce.number(),
  discount: z.coerce.number(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;

const CreateProduct = () => {
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [categoryError, setCategoryError] = useState(false);
  const [coverImageError, setCoverImageError] = useState(false);
  const [coverImage, setCoverImage] = useState<string | FileList | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaType>({ resolver: zodResolver(ProductSchema) });

  const user = useUser();

  const mutation = useMutation(createProduct);

  const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
    if (!coverImage || !categoryId) {
      return;
    }
    let newData = { ...data, coverImage, categoryId, staffId: user.data.id };
    mutation.mutate(newData, {
      onError: (error: any) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Success");
      },
    });
  };

  const handleClick = () => {
    if (!categoryId) {
      setCategoryError(true);
    }
    if (!coverImage) {
      setCoverImageError(true);
    }
  };

  return (
    <div className="grid gap-xs p-sm max-w-md mx-auto">
      <form className="grid gap-xs  " onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          label="Product Name"
          error={errors["name"]}
          registration={register("name")}
        />
        <TextAreaField
          registration={register("description")}
          label="Description"
          error={errors["description"]}
        />
        <InputField
          type="text"
          label="price"
          error={errors["price"]}
          registration={register("price")}
        />
        <ImageUpload
          setImageError={setCoverImageError}
          label="Cover image"
          image={coverImage}
          setImage={setCoverImage}
          imageError={coverImageError}
        />

        <InputField
          type="number"
          label="Tax"
          error={errors["tax"]}
          registration={register("tax")}
        />
        <InputField
          type="number"
          label="Discount"
          error={errors["discount"]}
          registration={register("discount")}
        />

        <CategoryWrapper
          setCategoryError={setCategoryError}
          setCategoryId={setCategoryId}
          categoryError={categoryError}
        />
        <div>
          <Button
            type="submit"
            className="w-full max-w-sm mx-auto disabled:opacity-50"
            disabled={mutation.isLoading}
            onClick={handleClick}
            isLoading={mutation.isLoading}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
