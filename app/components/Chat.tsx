"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Pusher from "pusher-js"
type ChatMessage ={
   data:{
        userAuthor:{
            name:string | null,
            image:string | null,
        },
        
        content:string
        
   }[];
}
export default function ChatComponent({data}:ChatMessage){
    const [messages,setMessages]=useState(data)
   const messageEndRef=useRef<HTMLInputElement>(null)
    
    

    useEffect(()=>{

        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string
            , {
            cluster: 'us2'
          });
    
        var channel= pusher.subscribe("chat");
        channel.bind("hello",function (data:any){
            const parsedComments=JSON.parse(data.message)
            setMessages((prev)=>[...prev,parsedComments])
        })

        return ()=>{
            pusher.unsubscribe("chat")
        }

    })

    useEffect(()=>{
            scrollToBottom()
    },[messages])


    function scrollToBottom(){
        messageEndRef.current?.scrollIntoView({behavior:"smooth"})
    }


    return (
        <div className="p-6 max-h-screen overflow-y-auto py-32">
            <div className="flex flex-col gap-4">
                {messages.map((msg,index)=>(
                <div key={index}>
                    <div className="flex items-center ">
                        <Image
                            src={msg.userAuthor.image as string}
                            width={50}
                            height={50}
                            alt="user-image"
                            className="w-12 h-12 rounded-lg object-cover mr-9 ml-2"
                        />
                        <div className="rounded-lg bg-white p-4 shadow-md self-start">{msg.content}</div>
                    </div>
                    <p className="font-light text-sm text-gray-600">{msg.userAuthor.name}</p>
                </div>))}
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}