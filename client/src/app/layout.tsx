import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const font = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden text-neutral-800',
          font.className,
        )}
      >
        {children}
      </body>
    </html>
  )
}
