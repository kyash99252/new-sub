import { getAllUsers } from '@/app/actions/actions'
import DeleteButton from './delete-button'
import { UserEditDialog } from './user-edit-dialog'

export default async function DirectoryPage() {
  const users = await getAllUsers()

  if (!users.length) {
    return <p className="text-center mt-10">No users found.</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Phone</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border border-gray-300 hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <UserEditDialog user={user} />
                <DeleteButton userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
