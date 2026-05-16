import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ConvexClientProvider } from './ConvexClientProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AltEra — Simulate the Unseen',
  description:
    'Change one moment in history. Watch the butterfly effect reshape the world.',
}

export const viewport: Viewport = {
  themeColor: '#0f0f12',
  width: 'device-width',
  initialScale: 1,
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  )
}
