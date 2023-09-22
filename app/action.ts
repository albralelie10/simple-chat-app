"use server"

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";


export async function PostData(formData:FormData){
    "use server";
    const session = await getServerSession(authOptions)
    const message=formData.get("message")//Recuperramos el valor del objeto evento correspondiente al input con un valor de campo 'name' = 'message'

    const Pusher=require("pusher")

    const data=await prisma.message.create({
        data:{
            content:message as string,
            email: session?.user?.email as string
        },
        include:{
            userAuthor:{
                select:{
                    name:true,
                    image:true,
                }
            }
        }
    })

   

    const pusher=new Pusher({
        appId:process.env.PUSHER_APP_ID,
        key:process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret:process.env.PUSHER_APP_SECRET,
        cluster:"us2",
        useTLS:true,
    })

    await pusher.trigger("chat","hello",{
        message:`${JSON.stringify(data)}\n\n`
    })
}