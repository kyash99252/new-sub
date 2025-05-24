import SignInButton from "./SignInButton"

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500">Choose your sign in method</p>
        </div>
        <SignInButton />
      </div>
    </div>
  )
} 