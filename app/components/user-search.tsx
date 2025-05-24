import { getUserById } from '@/app/actions/actions';
import { Suspense } from 'react';
import SearchInput from './search-input-cmd';
import UserCard from './user-card';

export default async function UserSearch({ searchParams }: { searchParams?: { userId?: string } }) {
  const selectedUserId = searchParams?.userId || null;

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
