import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { TechnicalOverview } from "./components/technical-overview";
import { UserDialog } from "./components/user-dialog";
import UserSearch from "./components/user-search"; // Ensure this import is correct

// Define the shape of the searchParams object once it's resolved
interface ResolvedPageIncomingSearchParams {
  [key: string]: string | string[] | undefined;
}

// Define the props for the Home page component as Next.js provides them
// For async pages in Next.js 15.3.2, searchParams can be a Promise
interface HomePageProps {
  searchParams?: Promise<ResolvedPageIncomingSearchParams>; // Next.js provides this as a Promise
  // params?: { [key: string]: string | string[] }; // Add if you use dynamic route params like app/users/[id]/page.tsx
}

export default async function Home({
  searchParams: incomingSearchParamsPromise, // This is the Promise from Next.js
}: HomePageProps) {
  // Await the promise from Next.js to get the actual searchParams object
  // If incomingSearchParamsPromise is undefined, resolvedIncomingSearchParams will be undefined.
  const resolvedIncomingSearchParams = incomingSearchParamsPromise
    ? await incomingSearchParamsPromise
    : undefined;

  console.log('Home Component - resolvedIncomingSearchParams received:', resolvedIncomingSearchParams);

  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  // Extract userId as a string if present from the *resolved* search params
  const userId = typeof resolvedIncomingSearchParams?.userId === "string"
    ? resolvedIncomingSearchParams.userId
    : undefined;

  // Your UserSearch component expects a Promise specifically shaped as Promise<{ userId?: string }>
  // We create this *new* promise for UserSearch based on the extracted userId.
  const userSearchPropPromise: Promise<{ userId?: string }> = Promise.resolve({ userId: userId });

  console.log('Home Component - userSearchPropPromise being passed to UserSearch:', userSearchPropPromise);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      {/* Pass the specifically typed promise to UserSearch */}
      <UserSearch searchParams={userSearchPropPromise} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}