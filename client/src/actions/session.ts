'use server'

import { cookies } from 'next/headers'

// interface Session {
//   user: User
// }

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  google_id: string
  credits: number
  created_at: string
  updated_at: string
}

const getSession = async () => {
  return await getSelf()
}

const getSelf = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/self`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      credentials: 'include',
    })

    if (!res.ok) {
      return null
    }

    const data: User = await res.json()

    return {
      data,
    }
  } catch (error) {
    return null
  }
}

export default getSession
