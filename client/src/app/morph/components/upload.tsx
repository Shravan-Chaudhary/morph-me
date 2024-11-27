'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/user-store'
import {
  BadgeCent,
  Check,
  OctagonAlert,
  Trash2,
  Upload as UploadIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface UploadProps {
  isTransforming: boolean
  onUploadComplete: (url: string) => void
  onDelete: () => void
}

export default function Upload({
  isTransforming,
  onUploadComplete,
  onDelete,
}: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const { user } = useUserStore()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      handleUpload(file)
    }
  }

  const handleDelete = () => {
    setSelectedFile(null)
    setPreview(null)
    setMessage('')
    setProgress(0)
    onDelete() // Notify parent component
  }

  const handleUpload = async (file: File) => {
    setLoading(true)
    setMessage('')
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      if (user!.credits < 1) {
        setMessage('Insufficient credits.')
        return
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        // console.log('File URL:', data.fileUrl, data.message)
        onUploadComplete(data.fileUrl) // Send url to parentt component
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className='w-full max-w-sm '>
        <CardContent className='p-3'>
          <div className='relative'>
            {preview && !loading ? (
              <div className='relative rounded-lg bg-zinc-50 dark:bg-zinc-900 p-3'>
                <div className='w-full h-44 relative overflow-hidden rounded-lg mb-3'>
                  <Image
                    src={preview}
                    alt='Uploaded image preview'
                    layout='fill'
                    objectFit='contain'
                    className='rounded-lg'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  {message.startsWith('Insufficient credits.') && (
                    <div className='flex items-center space-x-2'>
                      <BadgeCent className='size-4 text-green-600' />

                      <span className='text-sm font-medium text-red-500'>
                        Insufficient Credits.
                      </span>
                    </div>
                  )}
                  {message.startsWith('uploaded successfully!') && (
                    <div className='flex items-center space-x-2'>
                      <div className='size-7 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center'>
                        <Check className='size-4 text-emerald-500' />
                      </div>
                      <span className='text-sm font-medium'>
                        Upload complete
                      </span>
                    </div>
                  )}

                  {message && message.startsWith('Error') && (
                    <div className='flex items-center space-x-2'>
                      <div className='size-7 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center'>
                        <OctagonAlert className='size-4 text-red-500' />
                      </div>
                      <span className='text-sm font-medium text-red-500'>
                        Upload Failed!
                      </span>
                    </div>
                  )}
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={handleDelete}
                    className='size-7 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                    disabled={isTransforming}
                  >
                    <Trash2 className='size-4' />
                  </Button>
                </div>
              </div>
            ) : (
              <label
                htmlFor='file-input'
                className={cn(
                  'group relative flex flex-col items-center justify-center w-full h-44 rounded-lg border border-dashed transition-all duration-300 cursor-pointer',
                  loading
                    ? 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950',
                )}
              >
                <div className='space-y-4 text-center'>
                  {loading ? (
                    <div className='w-full max-w-[200px] space-y-4 px-4'>
                      <div className='text-sm text-zinc-600 dark:text-zinc-400'>
                        Uploading your image...
                      </div>
                      <Progress value={progress} className='h-1 w-full' />
                    </div>
                  ) : (
                    <>
                      <div className='relative'>
                        <UploadIcon className='mx-auto size-10 text-zinc-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400' />
                      </div>
                      <div className='space-y-2'>
                        <p className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>
                          Drop your image here or click to upload
                        </p>
                        <p className='text-xs text-zinc-500 dark:text-zinc-500'>
                          Supports JPG and PNG
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  id='file-input'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                />
              </label>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
