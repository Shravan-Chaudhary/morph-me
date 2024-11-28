import { Icons } from '@/components'
import {
  Camera,
  Clock,
  CloudLightning,
  MessageCircle,
  Palette,
  Save,
  Shield,
  Shuffle,
  Sparkles,
} from 'lucide-react'

export const process = [
  {
    icon: Camera,
    title: 'Upload Photo',
    info: 'Take or upload a photo of yourself to get started.',
  },
  {
    icon: Palette,
    title: 'Choose Style',
    info: 'Select from a collection of artistic styles for your photo.',
  },
  {
    icon: Icons.customize,
    title: 'Morphed Image',
    info: 'Our A.I transforms your photo into a unique piece of art.',
  },
]

export const features = [
  {
    icon: Sparkles,
    title: 'One-Click Styles',
    info: 'Transform photos into 3D, clay, pixel or video game characters instantly.',
  },
  {
    icon: CloudLightning,
    title: 'Quick Processing',
    info: 'Advance AI delivers your morphed phots in seconds.',
  },
  //   {
  //     icon: Palette,
  //     title: 'Style Library',
  //     info: 'Growing collection of artistic styles from pixel art to clay sculptures.',
  //   },
  {
    icon: MessageCircle,
    title: 'Optional Prompts',
    info: `Add personality tweaks like 'zombie' or 'model' to your transformations.`,
  },
  {
    icon: Shuffle,
    title: 'Style Mixing',
    info: 'Combine styles with custom prompts for unique results.',
  },
  {
    icon: Clock,
    title: 'History Access',
    info: 'Return to your previous transformations anytime.',
  },
  {
    icons: Shield,
    title: 'Private & Secure',
    info: 'Your photos are processed securely and never shared.',
  },
]

export const pricingCards = [
  {
    title: 'Basic Pack',
    description: 'Great for casual creators',
    price: '$2',
    highlight: 'Everything in Free, plus',
    buttonText: 'Get 20 Credits',
    features: ['20 transformation credits', 'Email support'],
    priceId: 'price_1OYxkqFj9oKEERu1KfJGWxgN',
  },
  {
    title: 'Creator Pack',
    description: 'Perfect for regular content creators',
    price: '$5',
    highlight: 'Best value',
    buttonText: 'Get 70 Credits',
    features: [
      '60 transformation credits',
      '10 bonus credits',
      'Email support',
    ],
    priceId: 'price_1OYxkqFj9oKEERu1NbKUxXxN',
  },
  {
    title: 'Pro Pack',
    description: 'For professional creators',
    price: '$10',
    highlight: 'Most Popular',
    buttonText: 'Get 160 Credits',
    features: [
      '130 transformation credits',
      '30 bonus credits',
      'Email support',
    ],
    priceId: 'price_1OYxkqFj9oKEERu1NbKUxXxN',
  },
]
export const bentoCards = [
  {
    title: 'Start with Inspiration',
    info: 'Browse our vast library of pre-designed templates or upload your own images.',
    imgSrc: '/assets/bento-1.svg', // Lightbulb or Inspiration icon
    alt: 'Inspiration for website creation',
  },
  {
    title: 'AI Assists Your Vision',
    info: 'Our intelligent AI tailors suggestions and functionalities based on your goals.',
    imgSrc: '/assets/bento1.svg', // AI Assistant icon
    alt: 'AI website building assistant',
  },
  {
    title: 'Drag & Drop Customization',
    info: 'Effortlessly personalize your website with our intuitive drag-and-drop editor.',
    imgSrc: '/assets/bento1.svg', // Drag and Drop icon or hand editing a website
    alt: 'Website customization with drag and drop',
  },
  {
    title: 'Launch & Shine Online',
    info: 'Publish your website with a single click and take your brand to the world.',
    imgSrc: '/assets/bento1.svg', // Rocket launching or website going live
    alt: 'Website launch and publication',
  },
]

export const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
]

export const tweetData = [
  {
    id: 1,
    author: 'Akash',
    handle: '@akash_creates',
    content:
      'My gaming squad lost it when I showed up as a perfect Minecraft character! MorphMe is pure magic 🎮 #AImagic',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    author: 'Ayush',
    handle: '@sengar_ayush',
    content:
      "Can't stop morphing! Started with one selfie, now I have a whole gallery of AI-transformed portraits ✨. #PhotoFun",
    image: '/placeholder.svg',
  },
  {
    id: 3,
    author: 'Bharat',
    handle: '@techilicious',
    content:
      'The clay filter turned me into a museum masterpiece! Super impressed with how fast it works 🎨',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    author: 'Nishkarsh',
    handle: '@nishkarsh_k',
    content:
      'From selfie to emoji in seconds! Perfect for spicing up those work chats 😄',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    author: 'Shubhanshu',
    handle: '@shub',
    content:
      'Made my whole team into superheroes for our meeting! Even the boss loved it 💫',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    author: 'Navya',
    handle: '@lady_navya',
    content:
      'These AI styles are amazing! Perfect for my creative portfolio ✨ #AIart',
    image: '/placeholder.svg',
  },
  {
    id: 7,
    author: 'Alice',
    handle: '@alice_in_tech',
    content:
      'One selfie, endless possibilities! Each transformation feels like magic ⭐',
    image: '/placeholder.svg',
  },
]
