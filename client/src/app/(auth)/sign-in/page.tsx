'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LoginCard from '../_components/login-card'
import { Container, Wrapper } from '@/components'

export default function Component() {
  return (
    <section className='min-h-screen bg-gradient-to-br from-green-50 to-white'>
      <Wrapper>
        <Container className='w-full min-h-screen flex flex-col items-center justify-center'>
          <div className='w-full max-w-md relative'>
            <Link
              href='/'
              className='absolute -top-8 right-3 inline-flex items-center text-sm text-muted-foreground hover:text-green-600 transition-colors duration-300'
            >
              <ArrowLeft className='w-4 h-4 mr-1' />
              Home
            </Link>
            <LoginCard />
          </div>
        </Container>
      </Wrapper>
    </section>
  )
}
