"use client"

import React,{useRef} from 'react'
import { PostData } from '../action'

export const FormChat = () => {
  const formRef=useRef<HTMLFormElement>(null)
  return (
    <form 
    action={async (formData)=>{
      await PostData(formData)
      formRef.current?.reset()
    }}    
    ref={formRef}
    className='p-6 fixed bottom-0 left-0 w-full bg-white'>
        <div className='flex'>
            <input
            type="text"
            name="message" // valor del objeto evento 
            placeholder="Type your messsage ..."
            className='grow py-2 px-4 outline-none'
            />
            <button 
            type="submit"
            className='bg-teal-500 hover:bg-teal-200 text-white py-3 px-4 rounded-lg'
            >Send</button>
        </div>
    </form>
  )
}

export default FormChat