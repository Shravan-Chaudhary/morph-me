'use client'
import logout from '@/actions/logout'
import { useUserStore } from '@/stores/user-store'
import { CirclePlus, LogOut, WandSparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
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
import RetroCreditButton from './credits-button'

const ProfileButton = () => {
  const { toast } = useToast()
  const { user, update } = useUserStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      update(null)
      router.push('/')
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error logging out',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/self`, {
          method: 'GET',
          credentials: 'include',
        })
        if (!res.ok) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error fetching user details',
            duration: 2000,
          })
          return
        }
        const data = await res.json()
        update(data.user)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error fetching user details',
          duration: 2000,
        })
      }
    }
    fetchCustomer()
  }, [])
  return (
    <div className='flex items-center justify-center space-x-5 md:space-x-8 lg:space-x-12'>
      <RetroCreditButton credits={user?.credits} />
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
            <DropdownMenuItem
              className='font-medium cursor-pointer'
              onClick={handleLogout}
            >
              <LogOut className='size-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
