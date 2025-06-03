import ThemeSwitcher from '@/components/theme/ThemeSwitcher'
import '@/scss/theme.scss'
// We'll add animations in a different way
import Providers from '@/utils/providers'
import PropTypes from 'prop-types'
import { cn } from '@/utils/cn'
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const jakarta_sans = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta_sans',
})
const playfair = Playfair_Display({
  weight: ['600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata = {
  title: {
    default: 'aivalanche',
    template: '%s - aivalanche',
  },
  description:
    'aivalanche is an advanced platform with AI-driven engineering tools to accelerate discovery and innovation for engineering teams.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#87cb50" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={cn(
          'relative overflow-x-hidden bg-white text-base antialiased dark:bg-dark-300 transition-colors duration-300',
          inter.variable,
          jakarta_sans.variable,
          playfair.variable,
        )}>
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeSwitcher />
          {/* Simple structure without client-side animations */}
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node,
}