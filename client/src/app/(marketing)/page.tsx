import { Container, Wrapper } from '@/components'
import { AnimatedShinyPill } from '@/components/ui/animated-shiny-pill'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SectionBadge from '@/components/ui/section-badge'
import { features, pricingCards, process } from '@/constants'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronRight, Zap } from 'lucide-react'
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
              Powerful Features, Simple Design
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

      {/* Pricing */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-start md:text-center'>
            <SectionBadge title='Pricing' />
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Simple Pricing for Everyone
            </h2>
            <p className='text-muted-foreground mt-6'>
              Credits based pricing for all your transformation needs.
            </p>
          </div>
        </Container>
        <Container className='flex items-center justify-center'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl'>
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  'flex flex-col w-full border-x-neutral-700',
                  card.title == 'Unlimited Saas' && 'border-2 border-primary',
                )}
              >
                <CardHeader className='border-2 border-border'>
                  <span>{card.title}</span>
                  <CardTitle
                    className={cn(
                      card.title !== 'Unlimited Saas' &&
                        'text-muted-foreground',
                    )}
                  >
                    {card.price}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className='pt-6 space-y-3'>
                  {card.features.map((feature) => (
                    <div key={feature} className='flex items-center gap-2'>
                      <Zap className='w-4 h-4 fill-primary text-primary' />
                      <p className=''>{feature}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className='mt-auto w-full'>
                  <Link
                    href='#'
                    className={cn(
                      'w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium',
                      card.title !== 'Unlimited Saas' &&
                        '!bg-foreground !text-background',
                    )}
                  >
                    {card.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Wrapper>

      {/* Testimonials */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className=''></div>
        </Container>
      </Wrapper>
    </section>
  )
}

export default HomePage
