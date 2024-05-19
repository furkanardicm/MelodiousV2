import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Store/UserSlice'

export default function Sign() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [fullname, setFullname] = useState('');
  
    const {loading, error} = useSelector((state) => state.user);
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user !== null) {
        window.location.replace('/attribute');
      }
    }, []);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleRegister = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target)
      const username = formData.get('username');
      const password = formData.get('password');
      const mail = formData.get('mail');
      const fullname = formData.get('fullname');
      console.log(username + " " + password + " " + mail);

      let userCredentials = {
        username, password, mail, fullname
      }
      dispatch(registerUser(userCredentials)).then((result) => {
        if(result.payload){
          setUsername("");
          setPassword("");
          setMail("");
          setFullname("");
          window.location.replace('/attribute');
        }
      })
    }

    
  return (
    <form className='flex place-self-center my-auto' method="post" onSubmit={handleRegister}>
        <div className="w-[650px] bg-black/60 text-white flex flex-col p-10 place-self-center gap-1 rounded">
        {error && (<div className='w-full bg-black text-white px-4 py-2'>{error}</div>)}
            <label className='mx-auto py-1.5 px-5 font-bold rounded text-lg text-orange-500'> Sign up to Melodious</label>

                <label className='font-bold'>E-Mail</label>
                <input onChange={(e) => setMail(e.target.value)} id='mail' className='my-2 px-2 py-1 text-black font-bold' placeholder='example@gmail.com' type="email" name="mail" required/>

                <label className='font-bold'>Username</label>
                <input onChange={(e) => setUsername(e.target.value)}  id='username' className='my-2 px-2 py-1 text-black font-bold' placeholder='JohnDoe' type="text" name="username" required />

                <label className='font-bold'>Full Name</label>
                <input onChange={(e) => setFullname(e.target.value)}  id='fullname' className='my-2 px-2 py-1 text-black font-bold' placeholder='John Doe' type="text" name="fullname" required />

                <label className='font-bold'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)}  id='password' className='my-2 px-2 py-1 text-black font-bold' placeholder='********' type="password"  name="password" required />  

                <label className='font-bold'>Password Again</label>
                <input id='password2' className='my-2 px-2 py-1 text-black font-bold' placeholder='********' type="password" name="password2" required /> 

                <div className="flex flex-row gap-2 items-center">
                    <input id='checkbox' type="checkbox" name=""/>
                    <label>Accept all User Aggreements.</label>
                    <label className='ml-auto'>Do you have account ? <Link className='text-orange-500 hover:text-orange-600 transition-all' to="/login">Click to </Link> log in now!</label>
                </div> 
                <input className='mt-6 px-5 py-2 bg-green-600 mx-auto font-bold rounded cursor-pointer hover:bg-green-700 hover:text-gray-200 transition-all' type="submit" value="Sign up for FREE Now" />         
        </div>
    </form>
  )
}
