'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import LoginCard from '../_components/login-card'
import { Container, Wrapper } from '@/components'
import { Button } from '@/components/ui/button'

export default function Component() {
  return (
    <section className='min-h-screen bg-gradient-to-br from-green-50 to-white'>
      <Wrapper>
        <Container className='w-full min-h-screen flex flex-col items-center justify-center'>
          <div className='w-full max-w-md relative'>
            <Link
              href='/'
              className='absolute -top-8 right-3 flex items-center text-sm text-muted-foreground hover:text-neutral-800 transition-colors duration-300'
            >
              <ChevronLeft
                className='me-1 opacity-60'
                size={16}
                strokeWidth={2}
                aria-hidden='true'
              />
              Home
              <Home className='size-4 ml-1 mb-[2px]' />
            </Link>

            <LoginCard />
          </div>
        </Container>
      </Wrapper>
    </section>
  )
}
