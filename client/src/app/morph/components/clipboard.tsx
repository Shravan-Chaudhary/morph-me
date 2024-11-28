'use client'

import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyToClipboardProps {
  value: string
}

export function CopyToClipboard({ value }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant='ghost' size='icon' onClick={copy} className='h-8 w-8'>
      {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
      <span className='sr-only'>Copy prompt</span>
    </Button>
  )
}
