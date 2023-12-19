"use client"

import { createContext } from "react";
import { AuthUser, getCurrentUser, signIn, signUp } from "aws-amplify/auth"


export type AuthClientContextType = {
  user: AuthUser
}

const AuthClientContext = createContext({})

const handleSignIn = async (email: string, password: string) => {
  const { nextStep, isSignedIn } = await signIn({
    username: email,
    password: password
  })
}

const handleSignUP = async (email: string, password: string) => {
  const { nextStep, userId, isSignUpComplete } = await signUp({
    username: email,
    password: password
  })

  if(nextStep.signUpStep === "CONFIRM_SIGN_UP") {
    
  }

  if (isSignUpComplete) {
    const user =  await getCurrentUser()
  }
}