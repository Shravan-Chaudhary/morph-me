'use server'
import * as cookie from 'cookie'
import { cookies } from 'next/headers'

export default async function auth(code: string) {
  const cookieStore = cookies()
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    if (!res.ok) {
      const errorText = await res.json()
      return {
        type: 'error',
        message: errorText,
      }
    }

    const c = res.headers.getSetCookie()
    const accessToken = c.find((cookie) => cookie.includes('accessToken'))

    if (!accessToken) {
      return {
        type: 'error',
        message: 'No token recieved',
      }
    }
    const parsedAccessToken = cookie.parse(accessToken)
    if (!parsedAccessToken) {
      return {
        type: 'error',
        message: 'No token recieved',
      }
    }

    cookieStore.set({
      name: 'accessToken',
      value: parsedAccessToken.accessToken as string,
      maxAge: 2592000,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    })

    return {
      type: 'success',
      message: parsedAccessToken,
      token: parsedAccessToken.accessToken,
    }
  } catch (error) {
    return {
      type: 'error',
      message: 'Server error occurred',
    }
  }
}
