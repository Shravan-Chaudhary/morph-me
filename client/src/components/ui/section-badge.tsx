import React from 'react'

interface Props {
  title: string
}

const SectionBadge = ({ title }: Props) => {
  return (
    <div className='relative inline-flex h-8 overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none'>
      <span className='absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(142.1,76.2%,36.3%)_0%,hsl(142.1,76.2%,76.3%)_50%,hsl(142.1,76.2%,36.3%)_100%)]' />
      <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-green-950 px-4 py-1 text-sm font-medium text-green-700 dark:text-green-300 backdrop-blur-3xl'>
        {title}
      </span>
    </div>
  )
}

export default SectionBadge
