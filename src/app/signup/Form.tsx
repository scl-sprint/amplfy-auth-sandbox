"use client";

import { signUp } from "aws-amplify/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useDefaultForm } from "@/hooks/rhf/useDefaultForm";

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Form() {
  const { push } = useRouter();
  const pathname = usePathname();

  const [error, SetError] = useState<Error | null>(null);

  const handleSignUp = async ({ email, password }: SignUpFormValues) => {
    try {
      const { userId, nextStep, isSignUpComplete } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
          autoSignIn: true,
        },
      });

      if (!userId) {
        window.alert("ユーザー登録に失敗しました");
        return;
      }

      const urlParams = {
        username: userId,
      };

      if (nextStep.signUpStep == "CONFIRM_SIGN_UP") {
        push(`/signup/confirm?${new URLSearchParams(urlParams)}`);
      } else if (isSignUpComplete && nextStep.signUpStep == "DONE") {
        push(new URL("/", pathname).pathname);
      }
    } catch (error) {
      SetError(error as Error);
    }
  };

  const { register, handleSubmit } = useDefaultForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    handleSubmit(handleSignUp);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-8">
      <div>
        <label className="form-control" htmlFor="email">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            className="input input-bordered"
            {...register("email")}
            type="email"
            autoComplete="username"
          />
        </label>
        <label className="form-control" htmlFor="password">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            className="input  input-bordered"
            {...register("password")}
            type="password"
            autoComplete="new-password"
          />
        </label>
        <label htmlFor="confirmPassword">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            className="input  input-bordered"
            {...register("confirmPassword")}
            type="password"
            autoComplete="new-password"
          />
        </label>
      </div>

      {error && <div>{error.message}</div>}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
