"use client";

import { signIn } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

import { useDefaultForm } from "@/hooks/rhf/useDefaultForm";

export type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [error, setError] = useState<Error | null>(null);
  const { push } = useRouter();

  const handleSignIn = async ({ email, password }: SignInFormValues) => {
    try {
      const { isSignedIn } = await signIn({
        username: email,
        password: password,
      });

      if (isSignedIn) {
        push("/");
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useDefaultForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await handleSignIn(data);
  });

  return (
    <div className="flex flex-col items-center space-y-8">
      <form onSubmit={onSubmit} className="flex flex-col space-y-8">
        <label htmlFor="email" className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            {...register("email")}
            className="input input-bordered"
            type="email"
            placeholder="placeholder@example.com"
          />
        </label>
        <label htmlFor="password" className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            {...register("password")}
            className="input input-bordered"
            type="password"
            placeholder="********"
          />
        </label>
        {error && <div className="text-red-500">{error.message}</div>}
        <button className="btn btn-primary">Sign In</button>
      </form>
      <Link href={"/signup"} className="underline">
        Sign Up
      </Link>
    </div>
  );
}
