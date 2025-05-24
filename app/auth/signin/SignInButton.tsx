'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function SignInButton() {
  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
      redirect: true,
    })
  }

  return (
    <Button
      className="w-full"
      onClick={handleSignIn}
    >
      Sign in with Google
    </Button>
  )
} 