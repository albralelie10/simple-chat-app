import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './components/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'
import Image from 'next/image'
import { Logout, NavLogin } from './components/Button'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session=await getServerSession(authOptions)//OBTENER LA SESION
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <nav className='flex px-10 py-5 justify-between bg-white w-full fixed top-0 left-0'>
            <h1 className='text-black text-2xl font-bold'>
              Chat 
               <span className='text-cyan-500'>app</span>
            </h1>
            {session ? (
              //  alinear en medio del eje trnsversal
                <div className='flex items-center'>
                    <Image 
                    src={session.user?.image as string} 
                    alt="user-profile-photo" 
                    className='w-12 h-12 rounded-full mr-3'
                    width={50}
                    height={50} />
                   <Logout/>
                </div>
            ):(
              <div>
              <NavLogin/>
              </div>
            )}
          </nav>
          <main>{children}</main>
          </NextAuthProvider>
      </body>
    </html>
  )
}