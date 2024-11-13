import { Footer, Navbar } from '@/components'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const MorphLayout = ({ children }: Props) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default MorphLayout
