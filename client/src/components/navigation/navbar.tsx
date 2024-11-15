import { buttonVariants } from '@/components/ui/button'
import getSession from '@/lib/session'
import { LogOut, Zap } from 'lucide-react'
import Link from 'next/link'
import Icons from '../global/icons'

const Navbar = async () => {
  const session = await getSession()
  return (
    <header className='px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50'>
      <div className='flex items-center justify-between h-full mx-auto md:max-w-screen-xl'>
        <div className='flex items-start'>
          <Link href='/' className='flex items-center gap-2'>
            <Icons.logo className='w-8 h-8' />
            <span className='text-lg font-medium hover:text-neutral-800'>
              MorphMe
            </span>
          </Link>
        </div>

        <nav className='hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          <ul className='flex items-center justify-center gap-8'>
            <li className='hover:text-foreground/80 text-sm'>
              <Link href='#process'>Process</Link>
            </li>
            <li className='hover:text-foreground/80 text-sm'>
              <Link href='#features'>Features</Link>
            </li>
            <li className='hover:text-foreground/80 text-sm'>
              <Link href='#pricing'>Pricing</Link>
            </li>
          </ul>
        </nav>

        <div className='flex items-center gap-4'>
          {session ? (
            <>
              <Link
                href='/logout'
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
              >
                <span className='mr-2'>Logout</span>
                <LogOut className='w-4 h-4 text-primary' />
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/sign-in'
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
              >
                <span className='mr-2'>Get Started</span>
                <Zap className='w-4 h-4 fill-primary text-primary' />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
