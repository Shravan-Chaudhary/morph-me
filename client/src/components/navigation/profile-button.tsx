'use client'
import { User } from '@/lib/session'
import { CirclePlus, LogOut, WandSparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useToast } from '../hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const ProfileButton = () => {
  const [user, setUser] = useState<User>()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch('http://localhost:8080/self', {
          method: 'GET',
          credentials: 'include',
        })
        if (!res.ok) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error fetching user details',
          })
          return
        }
        const data = await res.json()
        setUser(data.user)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error fetching user details',
        })
      }
    }
    fetchCustomer()
  }, [])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-50'>
        <DropdownMenuLabel>
          <div className='flex flex-col gap-1 p-[2px]'>
            <p className='leading-none'>{user?.name}</p>
            <p className='text-xs md:text-sm leading-none text-muted-foreground break-all font-normal'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/buy-credits'>
            <DropdownMenuItem className='font-medium cursor-pointer'>
              <CirclePlus className='size-4' />
              Buy Credits
            </DropdownMenuItem>
          </Link>
          <Link href='/morph'>
            <DropdownMenuItem className='font-medium cursor-pointer'>
              <WandSparkles className='size-4' />
              Transform
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='font-medium cursor-pointer'>
            <LogOut className='size-4' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
{
  /* <Link
                href='/logout'
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
              >
                <span className='mr-2'>Logout</span>
                <LogOut className='w-4 h-4 text-primary' />
              </Link> */
}
export default ProfileButton
