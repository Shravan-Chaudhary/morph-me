import { cn } from '@/lib/utils'
import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

const Wrapper: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn('h-full w-full mx-auto max-w-screen-xl md:px-0', className)}
    >
      {children}
    </div>
  )
}

export default Wrapper
