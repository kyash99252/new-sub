import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { TechnicalOverview } from "./components/technical-overview";
import { UserDialog } from "./components/user-dialog";
import UserSearch from "./components/user-search";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // --- ADD THIS CONSOLE.LOG ---
  console.log('Home Component - searchParams received:', searchParams);
  // --- END ADDITION ---

  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  // Extract userId as a string if present
  const userId = typeof searchParams?.userId === "string" ? searchParams.userId : undefined;

  // --- ADD THIS CONSOLE.LOG ---
  console.log('Home Component - extracted userId:', userId);
  // --- END ADDITION ---

  // Wrap the userId object in a Promise.resolve()
  const userSearchPromise = Promise.resolve({ userId: userId });

  // --- ADD THIS CONSOLE.LOG ---
  console.log('Home Component - userSearchPromise:', userSearchPromise);
  // --- END ADDITION ---

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      {/* Pass the promise to UserSearch */}
      <UserSearch searchParams={userSearchPromise} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}