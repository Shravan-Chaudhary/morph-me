'use client'

import auth from '@/actions/auth'
import { Icons } from '@/components'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGoogleLogin } from '@react-oauth/google'
import { ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const login = useGoogleLogin({
    onSuccess: async (token) => {
      try {
        const res = await auth(token.code)
        if (res.type === 'error') {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error Loggin in. Please try again.',
            duration: 2000,
          })

          console.log('action response: ', res.message)
          return
        }
        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', res.token as string)
        }
        setLoading(false)
        window.location.href = '/morph'
      } catch (error) {
        setLoading(false)
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error logging in. Please try again.',
          duration: 2000,
        })
      }
    },
    onError: (error) => {
      setLoading(false)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error logging in. Please try again.',
        duration: 2000,
      })
    },
    flow: 'auth-code',
    ux_mode: 'popup',
  })

  return (
    <main className='grid min-h-screen w-full place-items-center overflow-x-hidden'>
      {/* Background with proper gradient */}
      <div
        className='fixed inset-0 w-screen'
        style={{
          background: 'linear-gradient(to right, #E8F3F9, #F5F0FF, #FCE7F3)',
        }}
      />

      {/* Content */}
      <div className='relative z-10 w-full max-w-md px-4'>
        {/* Home link */}
        <div className='mb-6'>
          <Link
            href='/'
            className='inline-flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors'
          >
            <Home className='mr-2 h-4 w-4' />
            Back to home
          </Link>
        </div>

        {/* Welcome pill */}
        <div className='mb-6 flex justify-center'>
          <div className='px-4 py-1.5 rounded-full border border-gray-200/50 bg-white/50 backdrop-blur-sm text-sm text-gray-700 shadow-sm'>
            ✨ Get 3 free credits on first login
          </div>
        </div>

        <Card className='bg-white/60 backdrop-blur-md border-gray-100/50 shadow-xl rounded-2xl overflow-hidden'>
          <CardHeader className='space-y-3 text-center pb-6'>
            <div className='space-y-2'>
              <h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
                Welcome back
              </h1>
              <p className='text-base text-gray-600'>
                Join the fun and create mind-bending transformations
              </p>
            </div>
          </CardHeader>
          <CardContent className='space-y-6 pb-6'>
            <Button
              variant='outline'
              className='w-full h-11 justify-center gap-3 px-4 bg-white/80 hover:bg-white text-gray-700 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 group'
              onClick={() => {
                setLoading(true)
                login()
              }}
              disabled={loading}
            >
              <Icons.google className='h-5 w-5' />
              <span className='text-sm font-medium'>Continue with Google</span>
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-2 text-gray-500'>
                  or continue with
                </span>
              </div>
            </div>

            <Button
              className='w-full h-11 justify-center px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group'
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
          <CardFooter className='px-6 pb-6'>
            <p className='text-xs text-center text-gray-500'>
              By continuing, you agree to our{' '}
              <Link
                href='/terms'
                className='underline underline-offset-4 hover:text-green-600 transition-colors'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy'
                className='underline underline-offset-4 hover:text-green-600 transition-colors'
              >
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
