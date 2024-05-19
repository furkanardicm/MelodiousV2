import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function MainLayout() {
    return (
    <div className='w-screen h-screen flex flex-col'>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
