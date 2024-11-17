import { Footer, Navbar } from '@/components'
import React from 'react'
import { redirect } from 'next/navigation'
import getSession from '@/actions/session'

interface Props {
  children: React.ReactNode
}

const PricingLayout = async ({ children }: Props) => {
  const session = await getSession()
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <div className='flex flex-col items-center w-full'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default PricingLayout
