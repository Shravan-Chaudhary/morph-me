import { Metadata } from 'next'

export const SITE_CONFIG: Metadata = {
  title: {
    // write a default title for astra a ai powered website builder suggest something unique and catchy don't use the same words of ai powered website builder give a unique name
    default: 'MorphMe - AI Powered Face Transformation ',
    template: `%s | MorphMe`,
  },
  description:
    'MorphMe is an AI powered face morphing tool that helps you create a face morphing photos in Seconds. No overenginered prompts required. Get started for free!',
  icons: {
    icon: [
      {
        url: '/icons/favicon.ico',
        href: '/icons/favicon.ico',
      },
    ],
  },
  openGraph: {
    title: 'Astra - AI Powered Website Builder',
    description:
      'Astra is an AI powered website builder that helps you create a website in minutes. No coding skills required. Get started for free!',
    images: [
      {
        url: '/assets/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shravan',
    title: 'Astra - AI Powered Website Builder',
    description:
      'Astra is an AI powered website builder that helps you create a website in minutes. No coding skills required. Get started for free!',
    images: [
      {
        url: '/assets/og-image.png',
      },
    ],
  },
  metadataBase: new URL('https://astra-app.vercel.app'),
}
