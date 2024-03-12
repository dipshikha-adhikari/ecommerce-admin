"use client";
import { login } from "@/app/auth/sign-in/login";
import { Button } from "@/components/elements/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
import { InputField } from "../forms/input-field";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
0;
type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const mutation = useMutation(login);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    mutation.mutate(data, {
      onError: (error: any) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        toast.success("Success");
        router.push("/");
      },
    });
  };

  return (
    <div className="grid gap-xs">
      <form className="grid gap-xs" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          label="Email Address"
          error={errors["email"]}
          registration={register("email")}
        />
        <InputField
          type="password"
          label="Password"
          error={errors["password"]}
          registration={register("password")}
        />
        <div>
          <Button
            type="submit"
            className="w-full disabled:opacity-50"
            disabled={mutation.isLoading}
            isLoading={mutation.isLoading}
          >
            Log in
          </Button>
        </div>
      </form>
      <div className="flex gap-1">
        <p>Don't have an account?</p>
        <Link
          href="/auth/sign-up"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
