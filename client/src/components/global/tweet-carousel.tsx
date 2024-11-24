'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { TweetCard } from './tweet-card'
import { tweetData } from '@/constants'

export function TweetCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    const autoplay = setInterval(() => {
      api.scrollNext()
    }, 2000)

    return () => clearInterval(autoplay)
  }, [api])

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      setApi={setApi}
      className='w-full max-w-5xl mx-auto'
    >
      <CarouselContent className='-ml-2 md:-ml-4'>
        {tweetData.map((tweet) => (
          <CarouselItem
            key={tweet.id}
            className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3'
          >
            <div className='p-1'>
              <TweetCard
                author={tweet.author}
                handle={tweet.handle}
                content={tweet.content}
                image={tweet.image}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
