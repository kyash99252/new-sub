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
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }
  const userId = typeof searchParams?.userId === "string" ? searchParams.userId : undefined;

  const userSearchPromise = Promise.resolve({ userId: userId });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <UserSearch searchParams={userSearchPromise} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}