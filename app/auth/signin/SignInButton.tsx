'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function SignInButton() {
  return (
    <Button
      className="w-full"
      onClick={() => signIn("google", { 
        callbackUrl: "https://new-sub-final-deploy.vercel.app" 
      })}
    >
      Sign in with Google
    </Button>
  )
} 