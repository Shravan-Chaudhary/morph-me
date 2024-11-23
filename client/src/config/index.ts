import { Metadata } from 'next'

export const SITE_CONFIG: Metadata = {
  title: {
    // write a default title for astra a ai powered website builder suggest something unique and catchy don't use the same words of ai powered website builder give a unique name
    default: 'MorphMe - Effortless AI-Powered Transformations',
    template: `%s | MorphMe`,
  },
  description:
    "Unleash your creativity with Morph-Me's intuitive AI tools. No lengthy prompts, just simple clicks to morph your images into captivating 3D clay, game-like, and other unique styles.",
  icons: {
    icon: [
      {
        url: '/icons/favicon.ico',
        href: '/icons/favicon.ico',
      },
    ],
  },
  openGraph: {
    title: 'MorphMe - Effortless AI-Powered Transformations',
    description:
      'MorphMe is an AI powered website builder that helps you create a website in minutes. No coding skills required. Get started for free!',
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
  metadataBase: new URL('https://morph-me.vercel.app'),
}
