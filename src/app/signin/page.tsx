import { SubmitHandler } from "react-hook-form";

import SignInForm from "./Form";

export default function SignIn() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl">Sign In</h1>
      <SignInForm />
    </main>
  );
}
