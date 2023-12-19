"use client";

import {
  ConfirmSignUpInput,
  confirmSignUp,
  resendSignUpCode,
} from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useDefaultForm } from "@/hooks/rhf/useDefaultForm";

type ConfirmSignUpFormValues = {
  code: string;
};

export default function Form() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const [error, setError] = useState<Error | null>(null);

  const { push } = useRouter();

  const handleConfirmSignUp = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: username,
        confirmationCode: confirmationCode,
      });
      if (isSignUpComplete) {
        push("/");
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleResendConfirmationCode = async ({
    username,
  }: {
    username: string;
  }) => {
    try {
      await resendSignUpCode({
        username,
      });
    } catch (error) {
      setError(error as Error);
    }
  };

  const { register, handleSubmit } = useDefaultForm<ConfirmSignUpFormValues>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await handleConfirmSignUp({
      username: username,
      confirmationCode: data.code.trim(),
    });
  });
  return (
    <div>
      <form className="flex flex-col space-y-8" onSubmit={onSubmit}>
        <div>
          <label htmlFor="code" className="form-control">
            <div className="label">
              <span className="label-text">Code</span>
            </div>
            <input
              id="code"
              {...register("code")}
              type="text"
              className="input input-bordered"
            />
          </label>
        </div>
        {error && (
          <div className="alert alert-error">
            <div className="flex-1">
              <label>{error.message}</label>
            </div>
          </div>
        )}

        <button className="btn btn-primary">Confirm Sign Up</button>
      </form>

      <button
        className="btn btn-secondary"
        onClick={() => {
          handleResendConfirmationCode({ username });
        }}
      >
        Resend confirmation code
      </button>
    </div>
  );
}
