import React from 'react'
import {Link} from 'react-router-dom'


export default function Home() {
  return (
    <div className='w-full h-full flex items-center'>
        <div className="w-[650px] bg-black/50 text-white flex flex-col p-10 my-auto ml-20 gap-2 rounded">
            <div className="flex gap-3 justify-center mt-5 flex-col">
                <h1 className='font-bold text-orange-600 text-3xl'>DISCOVER AMAZING SONGS</h1>
                <h3 className='font-bold text-white text-xl'>Bringing You Your Favorite Music</h3>
                <p>Looking for new songs to discover? Want to listen to music in your favorite genres?
                You've come to the right place! Our song recommendation website brings together the best songs for you. Get ready to explore!</p>
          </div>
            <div className="flex items-center justify-center mt-5">
              <Link to="/login" className='p-3 text-white bg-green-500 w-[40%] flex justify-center font-bold rounded-sm hover:text-gray-200 hover:bg-green-600 transition-all'>LOGIN FOR FREE</Link>
            </div>
        </div>
    </div>
  )
}
