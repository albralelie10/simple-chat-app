import { BtnMainPage } from './components/Button'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session=await getServerSession(authOptions)
  if(session) redirect("/chat")
  return (
    
    <div className='max-w-xl mx-auto border rounded-lg mt-32 p-10 -'>
        <h1 className='text-4xl font-semibold text-center'>Login to use chat</h1>
          <div className='mt-8'>
          <BtnMainPage/>
          </div>
    </div>
  )
}


