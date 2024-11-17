import { Container, Wrapper } from '@/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SectionBadge from '@/components/ui/section-badge'
import { pricingCards } from '@/constants'
import { cn } from '@/lib/utils'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BuyCreditsPage = () => {
  return (
    <section className='w-full relative flex flex-col items-center justify-center px-4 md:px-0 py-6'>
      {/* Pricing */}
      <Wrapper className='max-w-6xl flex flex-col items-center justify-center py-12 relative'>
        <Container>
          <div className='max-w-md md:mx-auto text-center'>
            <SectionBadge title='Pricing' />
            <p className='mt-4 text-lg font-semibold'>(Coming Soon)</p>
            <h2 className='text-3xl lg:text-4xl font-semibold mt-6'>
              Flexible Morphing, No strings Attached
            </h2>
            <p className='text-muted-foreground mt-6'>
              Say goodbye to subscription traps. With credits system you pay as
              you go.
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
    </section>
  )
}

export default BuyCreditsPage
