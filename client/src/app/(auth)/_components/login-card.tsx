'use client'

import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Fingerprint } from 'lucide-react'
import { Icons } from '@/components'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const LoginCard = () => {
  const login = useGoogleLogin({
    onSuccess: async (token) => {
      console.log(token.code)
      const res = await axios.get(
        `http://localhost:8080/auth/google/callback?code=${token.code}`,
      )
      console.log('from golagn:', res.data)
    },
    onError: (error) => {
      console.error(error)
    },
    flow: 'auth-code',
  })

  return (
    <Card className='w-full max-w-md bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg shadow-green-100/20 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-100/30'>
      <CardHeader className='space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight text-neutral-800 flex space-x-2 items-center justify-center'>
          <span>Login </span>
          <Fingerprint className='size-6' />
        </h1>
        <p className='text-sm text-muted-foreground'>
          Join the fun and create mind-bending transformations
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button
          variant='outline'
          className='w-full justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-neutral-800 rounded-lg border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all duration-300 group'
          onClick={() => login()}
        >
          <Icons.google className='w-6 h-6' />
          <span className='text-sm font-medium'>Continue with Google</span>
        </Button>
        <div className='relative'>
          <Separator className='absolute inset-0 flex items-center' />
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-muted-foreground'>or</span>
          </div>
        </div>
        <Button
          className='w-full justify-center px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group'
          onClick={() => {
            /* Add your email sign-in logic */
          }}
        >
          <span className='text-sm font-medium group-hover:translate-x-0.5 transition-transform'>
            Sign in with email
          </span>
          <ArrowRight className='w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity' />
        </Button>
      </CardContent>
      <CardFooter>
        <p className='text-xs text-center text-muted-foreground'>
          By continuing, you agree to our{' '}
          <a
            href='#'
            className='underline hover:text-green-600 transition-colors'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='#'
            className='underline hover:text-green-600 transition-colors'
          >
            Privacy Policy
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginCard
