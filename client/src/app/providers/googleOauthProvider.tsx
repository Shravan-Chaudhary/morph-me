'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  )
}
