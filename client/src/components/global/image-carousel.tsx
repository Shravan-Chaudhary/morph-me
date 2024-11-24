'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

// Sample image data
const images = [
  {
    id: 1,
    src: '/carousel/churchill.png',
    alt: 'Modern living room with minimalist design',
  },
  {
    id: 2,
    src: '/carousel/arnold3d.png',
    alt: 'Contemporary space with concrete walls',
  },
  {
    id: 3,
    src: '/carousel/lisaemoji.png',
    alt: 'Industrial style room with brick walls',
  },
  {
    id: 4,
    src: '/carousel/arnoldpixel.png',
    alt: 'Bright interior with wooden floors',
  },
  {
    id: 5,
    src: '/carousel/arnoldzombie.png',
    alt: 'Modern living room with blue sofa',
  },
]

export function ImageCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const autoplay = setInterval(() => {
      api.scrollNext()
    }, 3000)

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap())
    })

    return () => {
      clearInterval(autoplay)
      api.off('select', () => {
        setCurrentIndex(api.selectedScrollSnap())
      })
    }
  }, [api])

  // Create an extended array of images for seamless looping
  const extendedImages = [...images, ...images, ...images]

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        skipSnaps: false,
        startIndex: images.length,
      }}
      setApi={setApi}
      className='w-full max-w-6xl mx-auto'
    >
      <CarouselContent className='-ml-2 md:-ml-4'>
        {extendedImages.map((image, index) => (
          <CarouselItem
            key={`${image.id}-${index}`}
            className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3'
          >
            <div
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-xl transition-all duration-300 ease-in-out',
                index === currentIndex + images.length
                  ? 'lg:scale-110 lg:z-10'
                  : 'lg:scale-100 lg:z-0',
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-center object-cover'
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden md:flex' />
      <CarouselNext className='hidden md:flex' />
    </Carousel>
  )
}
