'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'

interface CustomSliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <div className='w-full px-1'>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className='w-full cursor-pointer'
      />
      <div className='flex justify-between mt-2'>
        <span className='text-sm text-muted-foreground'>${min}</span>
        <span className='text-sm text-muted-foreground'>${max}</span>
      </div>
    </div>
  )
}

export default CustomSlider
