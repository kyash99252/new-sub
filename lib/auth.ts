// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
    }
  },
  basePath: "/api/auth",
  baseUrl: process.env.NEXTAUTH_URL || "https://new-sub-final-deploy.vercel.app"
})
