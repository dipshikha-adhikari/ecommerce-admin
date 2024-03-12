"use client";
import Link from "next/link";
import React from "react";
import * as z from "zod";
import { Button } from "../elements/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../forms/input-field";

const RegisterSchema = z
  .object({
    fullname: z.string().min(1, { message: "Fullname is required" }),
    staffId: z.string().min(1, { message: "Staff ID is required" }),
    roleId: z.string().min(1, { message: "Role ID is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid gap-xs p-sm">
      <header className="text-xl font-semibold">Sign up to continue</header>
      <form className="grid gap-xs" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          label="Email Address"
          error={errors["email"]}
          registration={register("email")}
        />
        <InputField
          type="text"
          label="Fullname"
          error={errors["fullname"]}
          registration={register("fullname")}
        />
        <InputField
          type="text"
          label="Staff ID"
          error={errors["staffId"]}
          registration={register("staffId")}
        />
        <InputField
          type="text"
          label="Role ID"
          error={errors["roleId"]}
          registration={register("roleId")}
        />
        <InputField
          type="password"
          label="Password"
          error={errors["password"]}
          registration={register("password")}
        />
        <InputField
          type="password"
          label="Confirm Password"
          error={errors["confirmPassword"]}
          registration={register("confirmPassword")}
        />
        <div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>
      <div className="flex gap-1">
        <p>Already have an account?</p>
        <Link
          href="/auth/sign-in"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
