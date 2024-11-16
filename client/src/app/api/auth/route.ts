import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import cookie from 'cookie'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('code')

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/auth/google/callback?code=` + query,
    )
    if (!res.ok) {
      return Response.error()
    }

    const c = res.headers.getSetCookie()
    const accessToken = c.find((cookie) => cookie.includes('accessToken'))

    if (!accessToken) {
      return Response.json({ message: 'No token recieved' })
    }
    const parsedAccessToken = cookie.parse(accessToken)

    return Response.json({ data: 'token recieved', cookie: accessToken })
  } catch (error) {
    return NextResponse.error()
  }
}
// `http://localhost:8080/auth/google/callback?code=${token.code}`,
