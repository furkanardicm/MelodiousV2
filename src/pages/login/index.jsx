import React , {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../Store/UserSlice'

export default function Login() {

  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
 
  //redux states
  const {loading, error} = useSelector((state) => state.user);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      window.location.replace('/attribute');
    }
  }, []);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const username = formData.get('username');
    const password = formData.get('password');
    
    console.log(username + " " + password)
    let userCredentials = {
      username, password
    }
    dispatch(loginUser(userCredentials)).then((result) => {
      if(result.payload){
        setUsername("");
        setPassword("");
        window.location.replace('/attribute');
      }
    }) 
  }
  return (
    <form className='flex place-self-center my-auto' onSubmit={handleLogin} method="post">
        <div className="w-[650px] bg-black/60 text-white flex flex-col p-10 place-self-center gap-1 rounded">
            <label className='mx-auto py-1.5 px-5 font-bold rounded text-lg text-orange-500'> Login to Melodious</label>
            
                <label className='font-bold'>Username</label>
                <input className='my-2 px-2 py-1 text-black font-bold' onChange={(e) => setUsername(e.target.value)} placeholder='JohnDoe' type="text" id="username" name="username" required />

                <label className='font-bold'>Password</label>
                <input className='my-2 px-2 py-1 text-black font-bold' onChange={(e) => setPassword(e.target.value)} placeholder='********' type="password" name="password" id="password" required />  

                <div className="flex flex-row gap-2 items-center justify-center">
                    <input type="checkbox" name="" id="" />
                    <label>Keep me login.</label>
                    <label className='ml-auto justify-center'>Haven't any account yet ? <Link className='text-orange-500 hover:text-orange-600 transition-all' to="/sign">Click to </Link> register now !</label>
                </div> 

                <input className='mt-6 px-5 py-2 bg-green-600 mx-auto font-bold rounded cursor-pointer' type="submit" value={loading? "Loading..":"Login"} />         
                {error && (<div className='w-full h-10 mt-10 text-center font-semibold bg-red-700 rounded text-white px-4 py-2'>{error}</div>)}
        </div>
    </form>
  )
}
