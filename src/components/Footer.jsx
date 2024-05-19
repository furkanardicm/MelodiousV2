import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div className='relative bottom-0 p-4 w-full text-white font-bold mx-auto -my-0 flex justify-center text-center'> <Link className='text-orange-600 pr-2 hover:text-orange-700' to="#">Melodious.com </Link> | Created By <Link to="#"  className='text-orange-600 pl-2 hover:text-orange-700'> Furkan Ardıç</Link></div>
  )
}
