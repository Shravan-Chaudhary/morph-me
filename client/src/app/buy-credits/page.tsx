'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CreditDisplay from './components/credit-display'
import CustomSlider from './components/custom-slider'
import { useUserStore } from '@/stores/user-store'
import { Container, Wrapper } from '@/components'

export default function PricingPage() {
  const [price, setPrice] = useState(1)
  const [credits, setCredits] = useState(10)
  const { user } = useUserStore()

  useEffect(() => {
    // Calculate credits based on price
    const wholeCredits = Math.floor(price) * 10
    const fractionalCredits = price % 1 === 0.5 ? 5 : 0
    setCredits(wholeCredits + fractionalCredits)
  }, [price])

  return (
    <Wrapper>
      <Container>
        <div className='min-h-screen flex flex-col items-center justify-center p-4 w-full'>
          <div className='flex items-center justify-center flex-col mb-8'>
            <h1 className='text-3xl md:text-5xl font-bold text-neutral-800 '>
              Buy <span className='text-primary'>MorphMe</span> Credits
            </h1>
            <p className='text-base md:text-lg text-muted-foreground font-medium mt-5'>
              You have{' '}
              <span className='text-primary'>{user?.credits} credits</span>.
              Join hundereds of morphers by buying more below
            </p>
          </div>
          <Card className='w-full max-w-2xl'>
            <CardContent className='pt-6'>
              <CreditDisplay credits={credits} />
              <div className='text-center mb-6'>
                <p className='text-3xl font-semibold text-foreground'>
                  ${price.toFixed(2)}
                </p>
              </div>
              <CustomSlider
                min={1}
                max={20}
                step={0.5}
                value={price}
                onChange={(value) => setPrice(value)}
              />
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button
                size='lg'
                className='rounded-full transition-all duration-200'
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </Wrapper>
  )
}
