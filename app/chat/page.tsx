import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../lib/auth'
import FormChat from '../components/Form'
import { prisma } from '../lib/db'
import ChatComponent from '../components/Chat'

export async function getData(){
    return await prisma.message.findMany({
        select:{
            content:true,
            id:true,
            userAuthor:{
                select:{
                    image:true,
                    name:true
                }
            }
        },
        orderBy:{
            createdAt:"asc"
        },
        take:50
    })
    
}

//Add
export const dynamic="force-dynamic";

export const ChatHomePage = async() => {
    const session=await getServerSession(authOptions)
    if(!session ){
        redirect("/")
    }
    const data=await getData()
    return (
        <div className='h-screen bg-gray-200 flex flex-col '>
            <ChatComponent
            data={data as any}
            />
            <FormChat/>
        </div>
    )
}
export default ChatHomePage
