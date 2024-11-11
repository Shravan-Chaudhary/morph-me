'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId='394028597708-imm52q7a9d44u27dfj24nv3cdlvmgnfq.apps.googleusercontent.com'>
      {children}
    </GoogleOAuthProvider>
  )
}
