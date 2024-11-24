import { Container, Wrapper } from '@/components'
import { ImageCarousel } from '@/components/global/image-carousel'
import { TweetCard } from '@/components/global/tweet-card'
import { AnimatedShinyPill } from '@/components/ui/animated-shiny-pill'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Compare } from '@/components/ui/compare'
import Marquee from '@/components/ui/marquee'
import SectionBadge from '@/components/ui/section-badge'
import { Separator } from '@/components/ui/separator'
import SparklesText from '@/components/ui/sparkles-text'
import { reviews, tweetData } from '@/constants'
import { ArrowRight, Camera, Palette, Wand2 } from 'lucide-react'
import Link from 'next/link'

const HomePage = () => {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-6'>
      {/* Hero */}
      <Wrapper>
        {/* <div className='absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:5rem_5rem] md:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-100 h-[150vh] opacity-5' /> */}
        <Container className='z-10 mb-16'>
          <div className='flex flex-col items-center justify-center py-12 md:py-24 w-full'>
            <div className='grid md:grid-cols-2 gap-8 items-center mt-8 max-w-6xl mx-auto w-11/12 md:w-full'>
              {/* Left side - Text content */}
              <div className='flex flex-col items-center justify-center md:items-start'>
                <div className='mb-8 w-full flex items-center justify-center md:mb-10'>
                  <AnimatedShinyPill />
                </div>
                <h1 className='text-4xl md:text-5xl md:!leading-snug font-semibold bg-clip-text text-center'>
                  Transform Your Face with
                  <br />
                  <SparklesText
                    text='AI Magic'
                    className='font-semibold md:mt-2'
                  />
                </h1>
                <p className='text-base md:text-lg font-medium md:font-semibold text-foreground/70 mt-7 text-center'>
                  Upload a selfie and watch AI create amazing variations of your
                  look. Fast, fun, and incredibly easy to use.
                </p>
                <div className='flex relative items-center justify-start mt-8 md:mt-12'>
                  <Link
                    href='/morph'
                    className='flex items-center justify-center w-max rounded-full border border-gray-300 bg-white/90 hover:bg-gray-50 px-2 py-1 md:py-2 md:gap-8 shadow-md hover:shadow-lg transition-all cursor-pointer select-none'
                  >
                    <p className='text-foreground/85 text-base text-center md:text-lg font-medium pl-4 pr-4 lg:marker:pr-0'>
                      Transform your face now ✨
                    </p>
                    <Button
                      size='sm'
                      className='rounded-full hidden lg:flex border border-foreground/20'
                    >
                      Start Morphing
                      <ArrowRight className='w-4 h-4 ml-1' />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right side - Compare component */}
              <div className='relative w-full flex items-center justify-center'>
                {/* Gradient */}
                <div className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 -translate-y-1/2 h-3/4 inset-0 blur-[10rem]'></div>

                <div className='hidden md:flex relative bg-white/0 rounded-2xl w-full h-full border-none items-center justify-center'>
                  <Compare
                    firstImage='https://replicate.delivery/pbxt/KW7CdCusXMkkOs9bbCGYsInC8EUxlj3yBLxvfW9Fs9FFMZUL/MTk4MTczMTkzNzI1Mjg5NjYy.webp'
                    secondImage='https://replicate.delivery/pbxt/fP9XisyvE60KY6mKBRyDHHhoC2eVfoGehEJ0fCSUHi3PGzpTC/ComfyUI_00001_.png'
                    firstImageClassName='object-cover overflow-hidden'
                    secondImageClassname='object-cover overflow-hidden'
                    className='h-[500px] w-[500px]'
                    slideMode='drag'
                  />
                </div>
                <div className='md:hidden mt-5 bg-white/5 px-3 py-4 rounded-2xl w-full h-full border-none flex items-center justify-center'>
                  <Compare
                    firstImage='https://replicate.delivery/pbxt/KW7CdCusXMkkOs9bbCGYsInC8EUxlj3yBLxvfW9Fs9FFMZUL/MTk4MTczMTkzNzI1Mjg5NjYy.webp'
                    secondImage='https://replicate.delivery/pbxt/fP9XisyvE60KY6mKBRyDHHhoC2eVfoGehEJ0fCSUHi3PGzpTC/ComfyUI_00001_.png'
                    firstImageClassName='object-cover overflow-hidden'
                    secondImageClassname='object-cover overflow-hidden'
                    className='h-[320px] w-[310px]'
                    slideMode='drag'
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Process */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='The Process' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Three steps to build you a new face
            </h2>
            <p className='text-muted-foreground mt-6'>
              Turn your images into unique arts in just 3 simple steps.
            </p>
          </div>
        </Container>
        <Container>
          <div className='py-20'>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0'>
              <div className='flex flex-col items-start text-left px-0 py-6 md:p-6 relative md:py-[27px]'>
                <p className='text-lg font-semibold mb-4 text-neutral-800'>
                  Step 1
                </p>
                <Card className='w-16 h-16 flex items-center justify-center bg-purple-100 mb-4'>
                  <CardContent className='p-0'>
                    <Camera className='w-8 h-8 text-neutral-600' />
                  </CardContent>
                </Card>
                <h2 className='text-xl font-semibold mb-3 text-primary'>
                  Upload a Photo
                </h2>
                <p className='text-muted-foreground'>
                  Take or upload a photo of yourself to get started.
                </p>
                {/* Separator for medium and large screens */}
                <div className='hidden md:block absolute right-0 top-6 bottom-6'>
                  <Separator orientation='vertical' className='h-full' />
                </div>
                {/* Separator for mobile */}
                <div className='md:hidden w-full mt-4'>
                  <Separator className='w-full' />
                </div>
              </div>

              <div className='flex flex-col items-start text-left px-0 py-6 md:p-6 relative'>
                <p className='text-lg font-semibold mb-4 text-neutral-800'>
                  Step 2
                </p>
                <Card className='w-16 h-16 flex items-center justify-center bg-purple-100 mb-4'>
                  <CardContent className='p-0'>
                    <Palette className='w-8 h-8 text-gray-600' />
                  </CardContent>
                </Card>
                <h2 className='text-xl font-semibold mb-3 text-primary'>
                  Choose a Style
                </h2>
                <p className='text-muted-foreground'>
                  Select from a collection of artistic styles for your photo.
                </p>
                {/* Separator for large screens only */}
                <div className='hidden lg:block absolute right-0 top-6 bottom-6'>
                  <Separator orientation='vertical' className='h-full' />
                </div>
                {/* Separator for mobile */}
                <div className='md:hidden w-full mt-4'>
                  <Separator className='w-full' />
                </div>
              </div>

              <div className='flex flex-col items-start text-left px-0 py-6 md:p-6'>
                <p className='text-lg font-semibold mb-4 text-neutral-800'>
                  Step 3
                </p>
                <Card className='w-16 h-16 flex items-center justify-center bg-amber-100 mb-4'>
                  <CardContent className='p-0'>
                    <Wand2 className='w-8 h-8 text-amber-600' />
                  </CardContent>
                </Card>
                <h2 className='text-xl font-semibold mb-3 text-primary'>
                  Witness the Transformation
                </h2>
                <p className='text-muted-foreground'>
                  Our A.I transforms your photo into a unique piece of art.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Examples */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='Examples' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Transformations MorphMe Generated
            </h2>
            <p className='text-muted-foreground mt-6'>
              Transform you photos with powerful AI technology - no complex
              prompts needed.
            </p>
          </div>
        </Container>
        <Container>
          <div className='flex items-center justify-center mx-auto mt-8'></div>
        </Container>
        <Container>
          <div className='flex flex-col items-center justify-center py-10 md:py-20 w-full'>
            <ImageCarousel />
          </div>
        </Container>
      </Wrapper>

      {/* Testimonials */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='The Buzz' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              What people are saying
              {/* Morphed & Loving It */}
            </h2>
            <p className='text-muted-foreground mt-6'>
              From hilarious to mind-blowing - hear what our morphers have to
              say.
            </p>
          </div>
        </Container>
        <Container>
          <div className='py-10 md:py-20 w-full'>
            <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10'>
              <Marquee pauseOnHover className='[--duration:20s] select-none'>
                {tweetData.map((tweet) => (
                  <figure
                    key={tweet.id}
                    className='relative w-64 cursor-pointer overflow-hidden rounded-xl border-zinc-500/[.1] bg-background'
                  >
                    <TweetCard
                      key={tweet.id}
                      author={tweet.author}
                      handle={tweet.handle}
                      content={tweet.content}
                      image={tweet.image}
                    />
                  </figure>
                ))}
              </Marquee>
              {/* <Marquee
                reverse
                pauseOnHover
                className='[--duration:20s] select-none'
              >
                {tweetData.map((tweet) => (
                  <figure
                    key={tweet.id}
                    className='relative w-64 cursor-pointer overflow-hidden rounded-xl border-zinc-500/[.1] bg-background'
                  >
                    <TweetCard
                      key={tweet.id}
                      author={tweet.author}
                      handle={tweet.handle}
                      content={tweet.content}
                      image={tweet.image}
                    />
                  </figure>
                ))}
              </Marquee> */}
              {/* Fade */}
              <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background'></div>
              <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background'></div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Newsletter */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='Connect' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Stay in the loop
              {/* Morphed & Loving It */}
            </h2>
            <p className='text-muted-foreground mt-6'></p>
          </div>
        </Container>
      </Wrapper>
    </section>
  )
}

export default HomePage
