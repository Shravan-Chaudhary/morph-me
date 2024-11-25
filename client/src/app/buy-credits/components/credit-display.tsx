'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CreditDisplayProps {
  credits: number
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits }) => {
  return (
    <div className='text-center mb-8'>
      <p className='text-muted-foreground text-lg mb-2'>You&apos;ll receive</p>
      <motion.div
        key={credits}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className='text-6xl font-bold text-primary'
      >
        {credits}
      </motion.div>
      <p className='text-muted-foreground text-lg mt-2'>credits</p>
    </div>
  )
}

export default CreditDisplay
