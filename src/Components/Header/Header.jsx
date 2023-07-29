import React from 'react'
import UserNav from '../userNav/UserNav'
import "./Header.css"
export default function Header() {
  return (
    <div className='headerColor sticky top-0 z-30 py-2 shadow-md'>
        <div className="container  mx-auto max-w-screen-xl flex items-center justify-between ">
            <h1 className='text-orange-600 py-3 shadow font-bold'>
               <a href="/" className='text-5xl italic hover:text-orange-400'>TL Flix</a>
            </h1>
            <UserNav/>
        </div>
    </div>
  )
}
