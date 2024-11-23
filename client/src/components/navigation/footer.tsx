import Icons from '@/components/global/icons'
import { Github, Heart, Linkedin, Twitter, X } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32'>
      {/* Side Gradients */}
      <div className='hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]'></div>
      <div className='hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]'></div>

      <div className='grid gap-8 xl:grid-cols-3 xl:gap-8 w-full'>
        <div className='flex flex-col items-start justify-start md:max-w-[200px]'>
          <div className='flex items-start'>
            <Icons.logo className='w-7 h-7' />
            <p className='text-neutral-800 font-medium ml-2 pt-[2px]'>
              MorphMe
            </p>
          </div>
          <p className='text-muted-foreground mt-4 text-sm text-start'>
            Transform Your Face in Seconds with AI Magic.
          </p>
          <span className='mt-4 text-neutral-800 text-sm flex items-center'>
            Created by Shravan 👾
          </span>
          <div className='mt-3 flex gap-5 justify-center items-center'>
            <Link href='https://github.com/Shravan-Chaudhary' target='_blank'>
              <Github className='size-5' />
            </Link>
            <Link
              href='https://www.linkedin.com/in/shravan-chaudhary/'
              target='_blank'
            >
              <Linkedin className='size-5' />
            </Link>
            <Link href='https://x.com/10xshravan' target='_blank'>
              <Twitter className='size-5' />
            </Link>
          </div>
        </div>

        <div className='grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0'>
          <div className='md:grid md:grid-cols-2 md:gap-8'>
            <div className=''>
              <h3 className='text-base font-medium text-neutral-800'>
                Product
              </h3>
              <ul className='mt-4 text-sm text-muted-foreground'>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Features
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Pricing
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div className='mt-10 md:mt-0 flex flex-col'>
              <h3 className='text-base font-medium text-neutral-800'>
                Socials
              </h3>
              <ul className='mt-4 text-sm text-muted-foreground'>
                <li className=''>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Instagram
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    X
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='md:grid md:grid-cols-2 md:gap-8'>
            <div className=''>
              <h3 className='text-base font-medium text-neutral-800'>
                Resources
              </h3>
              <ul className='mt-4 text-sm text-muted-foreground'>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Blog
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Case Studies
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className='mt-10 md:mt-0 flex flex-col'>
              <h3 className='text-base font-medium text-neutral-800'>
                Company
              </h3>
              <ul className='mt-4 text-sm text-muted-foreground'>
                <li className=''>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    About Us
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className='mt-2'>
                  <Link
                    href=''
                    className='hover:text-foreground transition-all duration-300'
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full'>
        <p className='text-sm text-muted-foreground mt-8 md:mt-0'>
          &copy; {new Date().getFullYear()} MorphMe AI INC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
