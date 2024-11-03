import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ArtLens AI - Advanced Image Analysis & Visual Intelligence',
  description: 'Experience the power of ArtLens AI: A cutting-edge demonstration of artificial intelligence analyzing and interpreting visual content through images and text',
  keywords: 'AI, image analysis, artificial intelligence, visual recognition, ArtLens AI, machine learning',
  author: 'Falahgs4AI',
  openGraph: {
    title: 'ArtLens AI - Advanced Image Analysis & Visual Intelligence',
    description: 'Experience the power of ArtLens AI: A cutting-edge demonstration of artificial intelligence analyzing and interpreting visual content through images and text.',
    url: 'https://artlens-ai.vercel.app/',
    siteName: 'ArtLens AI',
    images: [
      {
        url: 'https://www.kdnuggets.com/wp-content/uploads/how-to-access-and-use-gemini-api-for-free_01.png',
        width: 1200,
        height: 630,
        alt: 'ArtLens AI Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtLens AI - Advanced Image Analysis & Visual Intelligence',
    description: 'Experience the power of ArtLens AI: A cutting-edge demonstration of artificial intelligence analyzing and interpreting visual content through images and text.',
    images: ['https://www.kdnuggets.com/wp-content/uploads/how-to-access-and-use-gemini-api-for-free_01.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='canonical'
          href='https://artlens-ai.vercel.app/'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='ArtLens AI - Advanced Image Analysis & Visual Intelligence'
        />
        <meta
          property='og:description'
          content='Experience the power of ArtLens AI: A cutting-edge demonstration of artificial intelligence analyzing and interpreting visual content through images and text.'
        />
        <meta
          property='og:image'
          content='https://www.kdnuggets.com/wp-content/uploads/how-to-access-and-use-gemini-api-for-free_01.png'
        />
        <meta
          property='og:url'
          content='https://artlens-ai.vercel.app/'
        />
        <meta
          name='twitter:title'
          content='ArtLens AI - Advanced Image Analysis & Visual Intelligence'
        />
        <meta
          name='twitter:description'
          content='Experience the power of ArtLens AI: A cutting-edge demonstration of artificial intelligence analyzing and interpreting visual content through images and text.'
        />
        <meta
          name='twitter:image'
          content='https://www.kdnuggets.com/wp-content/uploads/how-to-access-and-use-gemini-api-for-free_01.png'
        />
        <meta name='twitter:card' content='summary_large_image' />
        
        {/* Additional SEO meta tags */}
        <meta name='robots' content='index, follow' />
        <meta 
          name='keywords' 
          content='AI image analysis, visual recognition, artificial intelligence, machine learning, computer vision, ArtLens AI'
        />
        <meta name='author' content='Falahgs4AI' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
