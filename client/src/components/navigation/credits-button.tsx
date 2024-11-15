import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function RetroCreditButton({ credits }: { credits: any }) {
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className='px-2 space-x-1 md:space-x-2 cursor-default shadow-sm bg-inherit hover:bg-inherit flex items-center justify-center md:py-4'
    >
      <Image
        src='/assets/retro-coin.png'
        alt='credits'
        height={30}
        width={30}
        className='size-5 md:size-6'
      />
      <span className='text-neutral-600 font-medium text-xs md:text-sm'>
        {credits} Credits
      </span>
    </Button>
  )
}
