import { auth } from "@/lib/auth"; // 👈 update path if your auth export is in 'auth.ts' or adjust to the correct file
import { redirect } from "next/navigation";

import { TechnicalOverview } from "./components/technical-overview";
import { UserDialog } from "./components/user-dialog";
import UserSearch from "./components/user-search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>;
}) {
  const session = await auth(); // ✅ check if user is logged in

  if (!session) {
    redirect('/auth/signin') // Updated redirect path
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
