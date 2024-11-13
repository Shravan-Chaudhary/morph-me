'use client'
import React from 'react'
import Upload from './components/upload'
import { Container, Icons, Wrapper } from '@/components'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { Download, Share2 } from 'lucide-react'

const MorphPage = () => {
  const handleTransform = async () => {
    const image_url =
      'https://morph-me.s3.ap-south-1.amazonaws.com/1731476199284800300.webp'
    const style = 'clay'
    try {
      const res = await fetch('http://localhost:8080/morph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url, style }),
      })
      if (!res.ok) {
        console.error('Response status:', res.status)
        const errorText = await res.text()
        console.error('Error response:', errorText)
        return
      }
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-8'>
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-6 relative'>
        <Container>
          <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-10 gap-5'>
            {/* Left column */}
            <div className='md:col-span-4 flex flex-col items-center justify-center gap-8'>
              <h2 className='text-neutral-500 font-semibold text-base md:text-lg'>
                Upload your Photo or Selfie
              </h2>
              <Upload />
              {/* TODO: On lg screen use icons */}
              <Select>
                <SelectTrigger className='w-full max-w-sm md:max-w-[300px] rounded-2xl'>
                  <SelectValue placeholder='Select a Style' />
                </SelectTrigger>
                <SelectContent className='rounded-2xl'>
                  <SelectGroup>
                    <SelectLabel className='rounded-2xl'>Styles</SelectLabel>
                    <SelectItem value='apple'>3D</SelectItem>
                    <SelectItem value='banana'>Clay</SelectItem>
                    <SelectItem value='blueberry'>Video Game</SelectItem>
                    <SelectItem value='grapes'>Pixel</SelectItem>
                    <SelectItem value='pineapple'>Emoji</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Link href='#' className='w-full text-center'>
                <Button
                  onClick={handleTransform}
                  size='lg'
                  className='rounded-full px-6 w-full max-w-sm md:max-w-[200px]'
                >
                  <span className='text-base'>Transform</span>

                  <Icons.sparkles className='size-5 ml-2' />
                </Button>
              </Link>
            </div>
            {/* Right Column */}
            <div className='md:col-span-6 text-center flex flex-col gap-8 items-center justify-center'>
              <div>
                <h1 className='hidden md:block text-3xl text-neutral-800 font-semibold'>
                  Transform you <span className='text-primary'>face</span> in
                  seconds
                </h1>
                <h1 className='block md:hidden text-2xl text-neutral-800 font-semibold mt-6'>
                  Morphed Image
                </h1>
                <p className='hidden md:block text-base md:text-lg text-muted-foreground mt-6'>
                  Upload a selfie and watch AI create amazing variations of your
                  look.
                </p>
              </div>

              <div className='w-full max-w-[400px] aspect-square relative rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'>
                <Image
                  src='https://replicate.delivery/pbxt/XDe5oQQKRg0bdyAHjo2BOLAUtFDee1lfHQnL5Z4hANzWyO1JB/ComfyUI_00001_.png'
                  alt='Transformed image placeholder'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex justify-center gap-4 mt-4'>
                <Button variant='outline' size='sm' className='rounded-full'>
                  <Share2 className='h-4 w-4 mr-2' />
                  <span className=''>Share</span>
                </Button>
                <Button variant='outline' size='sm' className='rounded-full'>
                  <Download className='h-4 w-4 mr-2' />
                  <span className=''>Download</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </section>
  )
}

export default MorphPage
