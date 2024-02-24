import './globals.css'
import { Inter } from 'next/font/google'

//components
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mama shop',
  description: 'Mama shop originated from Singapore',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-teal-300`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
