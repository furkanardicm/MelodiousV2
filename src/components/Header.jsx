import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function getUser(){
  let user = localStorage.getItem('user');
  if(user) {
   user = JSON.parse(user);
  }
  else{
   user = null;
  }
  return user;
}

const handleClick = () => {
 localStorage.removeItem("user");
 window.location.replace("/");
};

export default function Header() {
  const [user, setUser] = useState(getUser());
  
  return (
    <div className='bg-transparent text-white font-bold text-base relative p-7 flex justify-around items-center'>
        <Link to="/">M E L O D I O U S</Link>
        <ul className='flex flex-row gap-5 items-center'>
            <li><Link className='hover:text-gray-200 transition-all' to="/home">Home</Link></li>
            <li><Link className='hover:text-gray-200 transition-all' to="/about">About Us</Link></li>
            <li><Link className='hover:text-gray-200 transition-all' to="/contact">Contact</Link></li>
            {user ? 
            <>
              <div className="flex flex-row gap-3 items-center justify-center">
                <Link to='/me' className='font-bold text-white bg-black px-4 py-3 rounded'>{user[0].username}</Link> 
                <button onClick={() => {handleClick()}} className='px-4 py-3 bg-red-700 text-white font-bold rounded hover:text-gray-200 shadow-md shadow-black' type="button">Logout</button>
              </div>
              
            </>
            
             :
            
            <>
              <li><Link className='hover:text-gray-200 transition-all' to="/login">Log in </Link></li>
              <li><Link className='hover:text-gray-200 transition-all' to="/sign">Sign up</Link></li>
            </>
            }          
        </ul>
    </div>
  )
}
