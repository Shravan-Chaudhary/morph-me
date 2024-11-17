import { Container, Wrapper } from '@/components'
import { AnimatedShinyPill } from '@/components/ui/animated-shiny-pill'
import { Button } from '@/components/ui/button'
import Marquee from '@/components/ui/marquee'
import SectionBadge from '@/components/ui/section-badge'
import SparklesText from '@/components/ui/sparkles-text'
import { features, process, reviews } from '@/constants'
import { ArrowRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HomePage = () => {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-6'>
      {/* Hero */}
      <Wrapper>
        {/* <div className='absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:5rem_5rem] md:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-100 h-[150vh] opacity-5' /> */}
        <Container className='z-10'>
          <div className='flex flex-col items-center justify-center py-16 md:py-20 w-full'>
            <AnimatedShinyPill />
            <div className='flex flex-col items-center mt-8 max-w-3xl mx-auto w-11/12 md:w-full'>
              <h1 className='text-4xl md:text-5xl md:!leading-snug font-semibold text-center bg-clip-text'>
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
              <div className='flex relative items-center justify-center mt-8 md:mt-12 w-full'>
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
            {/* Image and Gradient */}
            <div className='relative w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14'>
              {/* Gradient */}
              {/* previous classes: absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 -translate-y-1/2 h-3/4 inset-0 blur-[10rem] */}
              <div className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 -translate-y-1/2 h-3/4 inset-0 blur-[10rem]'></div>
              <div className='hidden md:inline-flex relative bg-white/0 py-10 rounded-2xl w-full h-full border-none  '>
                <Image
                  src='/assets/hero-image.svg'
                  alt='sample-image'
                  width={1400}
                  height={1400}
                  className='rounded-2xl'
                />
                {/* <BorderBeam size={250} duration={12} delay={9} /> */}
              </div>
              <div className='md:hidden mt-5 bg-white/5 px-4 py-10 rounded-2xl w-full h-full border-none'>
                <Image
                  src='/assets/hero-image.svg'
                  alt='sample-image'
                  width={1400}
                  height={2000}
                />
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Process */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-12 relative'>
        <Container>
          <div className='max-w-md px-2 md:mx-auto text-start md:text-center'>
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
          <div className='flex flex-col items-center justify-center py-10 md:py-20 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 lg:first:border-none first:border-gray-900'>
              {process.map((perk) => (
                <div
                  key={perk.title}
                  className='flex flex-col items-start px-4 py-4 md:px-6 lg:px-8 lg:py-6'
                >
                  <div className='flex items-center justify-center'>
                    <perk.icon className='w-8 h-8' />
                  </div>
                  <h3 className='text-lg font-medium mt-4'>{perk.title}</h3>
                  <p className='text-muted-foreground mt-2 text-start'>
                    {perk.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Features */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center px-4 md:px-2 py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='Features' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Powerful Transformation, Streamlined Experience
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8'>
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'
                >
                  <div className='bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4'>
                    {feature.icon && (
                      <feature.icon className='w-8 h-8 text-primary' />
                    )}
                  </div>
                  <h3 className='text-lg font-semibold mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    {feature.info}
                  </p>
                </div>
              ))}
            </div>
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
                {firstRow.map((review) => (
                  <figure
                    key={review.name}
                    className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-zinc-500/[.1] bg-background hover:bg-zinc-500/[.15]'
                  >
                    <div className='flex flex-row items-center gap-2'>
                      <User className='w-6 h-6' />
                      <div className='flex flex-col'>
                        <figcaption className='text-sm font-medium'>
                          {review.name}
                        </figcaption>
                        <p className='text-xs font-medium text-muted-foreground'>
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className='mt-2 text-sm'>
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className='[--duration:20s] select-none'
              >
                {secondRow.map((review) => (
                  <figure
                    key={review.name}
                    className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-zinc-500/[.1] bg-background hover:bg-zinc-500/[.15]'
                  >
                    <div className='flex flex-row items-center gap-2'>
                      <User className='w-6 h-6' />
                      <div className='flex flex-col'>
                        <figcaption className='text-sm font-medium'>
                          {review.name}
                        </figcaption>
                        <p className='text-xs font-medium text-muted-foreground'>
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className='mt-2 text-sm'>
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
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
