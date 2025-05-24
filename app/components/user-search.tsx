import { getUserById } from '@/app/actions/actions';
import { Suspense } from 'react';
import SearchInput from './search-input-cmd'; // Check this path if it's correct
import UserCard from './user-card';

export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  const resolvedSearchParams = await searchParams; // This will be { userId?: string } or undefined
  const selectedUserId = resolvedSearchParams?.userId || null;

  // Fetch the user based on the selectedUserId
  const user = selectedUserId ? await getUserById(selectedUserId) : null;

  return (
    <div className="space-y-6">
      <SearchInput />
      {selectedUserId && (
        <Suspense fallback={<p>Loading user details...</p>}>
          {user ? <UserCard user={user} /> : <p>User not found.</p>}
        </Suspense>
      )}
      {!selectedUserId && (
          <p className="text-sm text-muted-foreground">
              Use the search bar above to find user details by their ID.
          </p>
      )}
    </div>
  );
}