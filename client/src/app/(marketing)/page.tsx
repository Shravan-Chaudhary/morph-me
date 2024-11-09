import { Container, Wrapper } from '@/components'
import { AnimatedShinyPill } from '@/components/ui/animated-shiny-pill'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import SectionBadge from '@/components/ui/section-badge'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-8'>
      {/* Hero */}
      <Wrapper>
        <Container>
          <div className='flex flex-col items-center justify-center py-16 md:py-20 w-full'>
            <AnimatedShinyPill />
            <div className='flex flex-col items-center mt-8 max-w-3xl mx-auto w-11/12 md:w-full'>
              <h1 className='text-4xl md:text-6xl md:!leading-snug font-semibold text-center bg-clip-text'>
                Transform Your Face in Seconds with AI Magic
              </h1>
              <p className='text-base md:text-lg text-foreground/80 mt-6 text-center'>
                Upload a selfie and watch AI create amazing variations of your
                look. Fast, fun, and incredibly easy to use.
              </p>
              <div className='flex relative items-center justify-center mt-8 md:mt-12 w-full'>
                <Link
                  href='/morph'
                  className='flex items-center justify-center w-max rounded-full border border-gray-300 bg-white/90 hover:bg-gray-50 px-2 py-1 md:py-2 md:gap-8 shadow-md hover:shadow-lg transition-all cursor-pointer select-none'
                >
                  <p className='text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:marker:pr-0'>
                    Transform your face now ✨
                  </p>
                  <Button
                    size='sm'
                    className='rounded-full hidden lg:flex border border-foreground/20'
                  >
                    Stat Morphing
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </Link>
              </div>
            </div>
            {/* Image and Gradient */}
            <div className='relative w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-20'>
              {/* Gradient */}
              {/* previous classes: absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 -translate-y-1/2 h-3/4 inset-0 blur-[10rem] */}
              <div className='absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 -translate-y-1/2 h-3/4 inset-0 blur-[10rem]'></div>
              <div className='hidden md:inline-flex relative bg-white/10 px-4 py-10 rounded-2xl w-full h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-2xl'>
                <Image
                  src='/assets/hero-image.svg'
                  alt='sample-image'
                  width={1400}
                  height={1400}
                  className='rounded-2xl'
                />
                {/* <BorderBeam size={250} duration={12} delay={9} /> */}
              </div>
              <div className='md:hidden mt-5 bg-white/10 py-5 px-2 rounded-2xl w-full h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-3xl'>
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

      {/* Features */}
      <Wrapper className='flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className='max-w-md mx-auto text-start md:text-center'>
            <SectionBadge title='The Process' />
          </div>
        </Container>
      </Wrapper>
    </section>
  )
}

export default HomePage
