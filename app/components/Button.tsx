"use client"
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

export const Logout = () => {
  return (
    <button 
      onClick={()=>signOut()}
    className='flex items-center justify-center rounded-lg bg-red-500 px-8 py-3 font-semibold ring-red-300 text-sm text-white transition duration-100 hover:bg-red-600 md:text-base'>
        LogOut
    </button>
  )
}

export const NavLogin=()=>{
  return(
    <button
    onClick={()=>signIn("github")}
    className='flex items-center justify-center rounded-lg bg-teal-500 px-8 py-3 font-semibold ring-teal-300 text-sm text-white transition duration-100 hover:bg-teal-600 md:text-base'>
    
      LogIn
    </button>
  )
}

export const BtnMainPage=()=>{
  return(
    <button
    onClick={()=>signIn("github")}
    className='flex items-center justify-center rounded-lg bg-teal-500 px-8 py-3 font-semibold ring-teal-300 text-sm text-white transition duration-100 hover:bg-teal-600 md:text-base w-full'>
    
      Login with github
    </button>
  )
}
