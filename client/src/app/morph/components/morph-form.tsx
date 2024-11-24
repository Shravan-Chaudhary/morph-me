'use client'
import { Container, Icons, Wrapper } from '@/components'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserStore } from '@/stores/user-store'
import { Download, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Upload from './upload'

type Error = {
  error?: string
  string?: string
}

const MorphForm = () => {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('')
  const { toast } = useToast()
  const { user, updateCredits } = useUserStore()

  const disabled = user ? user.credits < 1 && true : false

  const handleUploadComplete = (url: string) => {
    setUploadedImageUrl(url)
  }

  const handleUploadDelete = () => {
    setUploadedImageUrl('')
  }

  const handleTransform = async () => {
    if (!uploadedImageUrl || !selectedStyle) return
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predictions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            image_url: uploadedImageUrl,
            style: selectedStyle,
          }),
          credentials: 'include',
        },
      )
      if (!res.ok) {
        console.error('Response status:', res.status)
        const errorText: Error = await res.json()
        console.error('Error response:', errorText)
        setError(errorText)
        if (res.status === 401) {
          setLoading(false)
          return toast({
            variant: 'destructive',
            title: 'Error',
            description: 'No token found. Please sign in again.',
            duration: 2000,
          })
        }
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorText.error,
          duration: 2000,
        })

        setLoading(false)
        return
      }
      const { status, prediction_id } = await res.json()
      // console.log('Prediction ID:', prediction_id)

      // Poll the status of the prediction
      const checkStatus = async (prediction_id: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/predictions/${prediction_id}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            },
          )

          if (!response.ok) {
            console.error('Response status:', response.status)
            const errorText: Error = await response.json()
            console.error('Error response:', errorText)
            setError(errorText)
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Server error occurred. Please try again.',
              duration: 2000,
            })

            setLoading(false)
            return
          }

          const prediction = await response.json()
          // console.log('Prediction status:', prediction.status)

          if (prediction.status === 'succeeded') {
            // console.log('Processing complete:', prediction.output)
            setProcessedImageUrl(prediction.output[0])
            // Get credits
            const userCreditsResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/remaining-credits`,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken',
                  )}`,
                },
              },
            )
            // Handle remaining credits errors
            if (!userCreditsResponse.ok) {
              const errorText: Error = await userCreditsResponse.json()
              console.error('Error getting user credits:', errorText)
              toast({
                variant: 'destructive',
                title: 'Error',
                description: errorText.error,
                duration: 2000,
              })

              setLoading(false)
              return
            }
            const userCredits: { credits: string } =
              await userCreditsResponse.json()
            console.log('User credits:', userCredits)
            const credits = parseInt(userCredits.credits)
            // Update credits in the store
            updateCredits(credits)
            setLoading(false)
            // Handle the completed prediction
          } else if (prediction.status === 'failed') {
            console.error('Processing failed:', prediction.error)
            setError(prediction.error)
            toast({
              variant: 'destructive',
              title: 'Processing Failed',
              description: prediction.error,
              duration: 2000,
            })

            setLoading(false)
            return
          } else {
            // Continue polling
            setTimeout(() => checkStatus(prediction_id), 2000) // Poll every 2 seconds
          }
        } catch (error) {
          console.error('Error checking status:', error)
          const errorMessage = {
            error:
              error instanceof Error
                ? error.message
                : 'An unknown error occurred',
            status: 'error',
          }
          setError(errorMessage)
          toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage.error,
            duration: 2000,
          })

          setLoading(false)
          return
        }
      }
      setTimeout(() => checkStatus(prediction_id), 15000)
    } catch (error) {
      console.error(error)
      const errorMessage = {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
      }
      setError(errorMessage)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage.error,
        duration: 2000,
      })

      setLoading(false)
      return
    }
  }

  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-10 md:mb-10'>
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-6 relative'>
        <Container>
          <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-10 gap-5'>
            {/* Left column */}
            <div className='md:col-span-4 flex flex-col items-center justify-center gap-8'>
              <h2 className='text-neutral-500 font-semibold text-base md:text-lg'>
                Upload your Photo or Selfie
              </h2>
              <Upload
                onUploadComplete={handleUploadComplete}
                onDelete={handleUploadDelete}
              />
              {/* TODO: On lg screen use icons */}
              <Select onValueChange={setSelectedStyle}>
                <SelectTrigger className='w-full max-w-sm md:max-w-[300px] rounded-2xl'>
                  <SelectValue placeholder='Select a Style' />
                </SelectTrigger>
                <SelectContent className='rounded-2xl'>
                  <SelectGroup>
                    <SelectLabel className='rounded-2xl'>Styles</SelectLabel>
                    <SelectItem value='3D'>3D</SelectItem>
                    <SelectItem value='Clay'>Clay</SelectItem>
                    <SelectItem value='Video game'>Video Game</SelectItem>
                    <SelectItem value='Pixels'>Pixels</SelectItem>
                    <SelectItem value='Emoji'>Emoji</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Link href='#' className='w-full text-center'>
                <Button
                  onClick={handleTransform}
                  size='lg'
                  className='rounded-full px-6 w-full max-w-sm md:max-w-[200px]'
                  disabled={
                    !uploadedImageUrl || !selectedStyle || loading || disabled
                  }
                >
                  <span className='text-base'>Transform</span>

                  <Icons.sparkles className='size-5 ml-2' />
                </Button>
              </Link>
              {user
                ? user.credits < 1 && (
                    <div className='flex items-center justify-center mt-3'>
                      <span className='text-red-500 font-medium text-sm md:text-base cursor-default'>
                        Insufficient Credits{' '}
                      </span>
                      <Link
                        href='/buy-credits'
                        className='font-medium text-sm md:text-base ml-2 text-primary hover:underline transition-all duration-100 cursor-pointer'
                      >
                        Buy from here
                      </Link>
                    </div>
                  )
                : ''}
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
                  src={
                    processedImageUrl ||
                    'https://replicate.delivery/pbxt/XDe5oQQKRg0bdyAHjo2BOLAUtFDee1lfHQnL5Z4hANzWyO1JB/ComfyUI_00001_.png'
                  }
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

export default MorphForm
