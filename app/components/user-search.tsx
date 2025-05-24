// app/components/user-search.tsx
import { getUserById } from '@/app/actions/actions';
import { Suspense } from 'react';
import SearchInput from './search-input-cmd'; // Check this path if it's correct
import UserCard from './user-card';

// CORRECTED: searchParams is a Promise as per Next.js 15.1 / React 19
export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  // Await the searchParams promise to get the actual object
  const resolvedSearchParams = await searchParams;
  const selectedUserId = resolvedSearchParams?.userId || null;

  // Fetch the user based on the selectedUserId
  const user = selectedUserId ? await getUserById(selectedUserId) : null;

  return (
    <div className="space-y-6">
      <SearchInput />
      {selectedUserId && (
        <Suspense fallback={<p>Loading user...</p>}>
          {user ? <UserCard user={user} /> : null}
        </Suspense>
      )}
    </div>
  );
}