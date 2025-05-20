//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { User, userSchema } from './schemas'

const users: User[] = [
    { id: '1', name: 'John Doe', phoneNumber: '0412345678', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phoneNumber: '0423456789', email: 'jane@example.com' },
    { id: '3', name: 'Alice Johnson', phoneNumber: '0434567890', email: 'alice@example.com' },
    { id: '4', name: 'Bob Williams', phoneNumber: '0445678901', email: 'bob@example.com' },
    { id: '5', name: 'Charlie Brown', phoneNumber: '0456789012', email: 'charlie@example.com' },
    { id: '6', name: 'Emily Davis', phoneNumber: '0467890123', email: 'emily@example.com' },
    { id: '7', name: 'Frank Miller', phoneNumber: '0478901234', email: 'frank@example.com' },
    { id: '8', name: 'Grace Lee', phoneNumber: '0489012345', email: 'grace@example.com' },
    { id: '9', name: 'Henry Moore', phoneNumber: '0490123456', email: 'henry@example.com' },
    { id: '10', name: 'Isabella Young', phoneNumber: '0401234567', email: 'isabella@example.com' },
]

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    const results = users.filter(user => user.name.toLowerCase().startsWith(query.toLowerCase()))
    console.log('Search results:', results)
    return results
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    const newId = crypto.randomUUID();
    const newUser = { ...data, id: newId }
    const validatedUser = userSchema.parse(newUser)
    users.push(validatedUser)
    return validatedUser
}

export async function deleteUser(id: string): Promise<void> {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) {
        throw new Error(`User with id ${id} not found`)
    }
    users.splice(index, 1)
    console.log(`User with id ${id} has been deleted.`)
    revalidatePath('/') // Revalidate the page or component path

}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) {
        throw new Error(`User with id ${id} not found`)
    }

    const existingUser = users[index]
    const updatedUser = { ...existingUser, ...data }
    const validatedUser = userSchema.parse(updatedUser) // Ensure the updated data adheres to schema

    users[index] = validatedUser
    console.log(`User with id ${id} has been updated.`)
    revalidatePath('/') // Revalidate the page or component path

    return validatedUser
}

export const getUserById = cache(async (id: string) => {
    const user = users.find(user => user.id === id)
    return user || null
})


// 'use server'

// import { prisma } from '@/lib/prisma'
// import { revalidatePath } from 'next/cache'
// import { userSchema } from './schemas'
// import { cache } from 'react'

// export async function searchUsers(query: string) {
//   const users = await prisma.user.findMany({
//     where: {
//       name: {
//         startsWith: query,
//         mode: 'insensitive'
//       }
//     }
//   })
//   return users
// }

// export async function addUser(data: Omit<User, 'id'>) {
//   const validatedUser = userSchema.parse(data)
//   const newUser = await prisma.user.create({
//     data: validatedUser
//   })
//   return newUser
// }

// export async function deleteUser(id: string) {
//   await prisma.user.delete({
//     where: { id }
//   })
//   revalidatePath('/')
// }

// export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>) {
//   const validatedData = userSchema.partial().parse(data)
//   const updatedUser = await prisma.user.update({
//     where: { id },
//     data: validatedData
//   })
//   revalidatePath('/')
//   return updatedUser
// }

export const getUserById = cache(async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
})
