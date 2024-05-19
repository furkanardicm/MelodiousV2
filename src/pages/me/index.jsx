import React from 'react'

function me() {
    const user = JSON.parse(localStorage.getItem('user'));
    user ? null || "null" : window.location.replace("/login");
  return (
    <div className='w-full h-full p-4  flex flex-col items-center justify-center  overflow-hidden'>
        <div className="w-[80%] h-[90%] bg-black/40 flex flex-col items-center justify-center gap-2 rounded overflow-hidden">
            <span className='w-64 py-2 rounded shadow-md shadow-black bg-red-700 text-white px-4 text-center items-center justify-center font-bold'>User Informations</span>
            <span className='w-64 py-2 rounded shadow-md shadow-black bg-stone-200 px-4 text-center items-center justify-center font-bold'>{user[0].username}</span>
            <span className='w-64 py-2 rounded shadow-md shadow-black bg-stone-200 px-4 text-center items-center justify-center font-bold'>{user[0].fullname}</span>
            <span className='w-64 py-2 rounded shadow-md shadow-black bg-stone-200 px-4 text-center items-center justify-center font-bold' px-4 text-center items-center justify-center font-bold>{user[0].e_mail}</span>
            <span className='w-64 py-2 rounded shadow-md shadow-black bg-stone-200 px-4 text-center items-center justify-center font-bold'>{user[0].password}</span>
        </div>
    </div>
  )
}

export default me