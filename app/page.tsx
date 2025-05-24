import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { TechnicalOverview } from "./components/technical-overview";
import { UserDialog } from "./components/user-dialog";
import UserSearch from "./components/user-search"; // Ensure this import is correct

export default async function Home({
  searchParams,
}: {
  // Use the standard Next.js type for searchParams on a page component
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log('Home Component - searchParams received:', searchParams); // Keep for debugging
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  // Extract userId as a string if present
  const userId = typeof searchParams?.userId === "string" ? searchParams.userId : undefined;
  const userSearchPromise: Promise<{ userId?: string }> = Promise.resolve({ userId: userId });

  console.log('Home Component - userSearchPromise:', userSearchPromise); // Keep for debugging

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      {/* Pass the explicitly typed promise to UserSearch */}
      <UserSearch searchParams={userSearchPromise} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}