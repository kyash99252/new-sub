import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { TechnicalOverview } from "./components/technical-overview";
import { UserDialog } from "./components/user-dialog";
import UserSearch from "./components/user-search";

export default async function Home({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <UserSearch searchParams={searchParams} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}
