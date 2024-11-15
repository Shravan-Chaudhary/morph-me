'use server'
import * as cookie from 'cookie'
import { cookies } from 'next/headers'

export default async function auth(code: string) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/auth/google/callback?code=${code}`,
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

    cookies().set({
      name: 'accessToken',
      value: parsedAccessToken.accessToken as string,
      maxAge: 2592000,
      path: '/',
      domain: '', // TODO: Change this to new domain after deployment
      secure: false,
      httpOnly: true,
    })

    return {
      type: 'success',
      message: parsedAccessToken,
    }
  } catch (error) {
    return {
      type: 'error',
      message: 'Server error occurred',
    }
  }
}
