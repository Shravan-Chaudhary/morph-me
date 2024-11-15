'use server'

import { cookies } from 'next/headers'

// interface Session {
//   user: User
// }

interface User {
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
  const res = await fetch('http://localhost:8080/self', {
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
}

export default getSession
