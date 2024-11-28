import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'

interface TweetCardProps {
  author: string
  handle: string
  content: string
  image: string
}

export function TweetCard({ author, handle, content, image }: TweetCardProps) {
  return (
    <Card className='w-full border-neutral-200 shadow-lg min-h-[170px]'>
      <CardHeader className='p-4 pb-0'>
        <div className='flex gap-3'>
          <Avatar className='h-10 w-10 border'>
            <AvatarImage src='/placeholder.svg' alt={handle} />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <div className='w-full flex items-center gap-1'>
                <span className='font-semibold'>{author}</span>
                <VerifiedIcon className='h-4 w-4 fill-blue-500 text-white' />
              </div>

              <span className='text-sm text-muted-foreground'>{handle}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <p className='text-sm'>
          {content.split(' ').map((word, index) =>
            word.startsWith('@') || word.startsWith('#') ? (
              <span key={index} className='text-blue-500'>
                {word}{' '}
              </span>
            ) : (
              word + ' '
            ),
          )}
        </p>
      </CardContent>
    </Card>
  )
}
