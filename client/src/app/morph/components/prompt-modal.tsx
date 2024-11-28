'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { CopyToClipboard } from './clipboard'

const examplePrompts = [
  'Make me look like a professional CEO with a suit in a modern office setting',
  'Transform me into a fantasy character with glowing eyes and ethereal features',
  'Create a vintage portrait style with sepia tones and classic lighting',
  'Turn me into an anime character with vibrant colors and expressive features',
  'Generate a cyberpunk version with neon accents and futuristic elements',
]

export function ExamplePrompts() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='gap-2'>
          Example Prompts
          <HelpCircle className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Example Prompts</DialogTitle>
          <DialogDescription className='space-y-2'>
            <p>Keep it simple and descriptive.</p>
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {examplePrompts.map((prompt, index) => (
            <div key={index} className='flex items-center gap-4 text-sm'>
              <p className='flex-1'>{prompt}</p>
              <CopyToClipboard value={prompt} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
