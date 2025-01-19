import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Authactions } from './redux/navslice';
import { useDispatch } from "react-redux";

const Login = () => {
  const [data,setdata] = useState({email:'',password:''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const changeHandler = (e)=>{
   const {name,value} = e.target;
   setdata({...data,[name]:value})
  
  }
  const submitdata = async (e)=>{
    e.preventDefault()
    setdata({email:'',password:''})
    try {
       if(data.email === '' || data.password === ''){
        return alert('All fields required')
       }
       const response = await axios.post('http://localhost:4000/api/v1/login',data)
       console.log(response.data)
       dispatch(Authactions.login())
       dispatch(Authactions.userrole(response.data.data.role))
       localStorage.setItem("id",response.data.data.id)
       localStorage.setItem('role',response.data.data.role)
       localStorage.setItem('token',response.data.data.token)
       alert(response.data.message)
       navigate('/profile')

    } catch (error) {
      console.log(`Error while login in frontend ${error.response.data.message}`)
    }
  }
  return (
    <div className='bg-zinc-800 min-h-screen flex items-center justify-center px-4'>
      <div className='flex flex-col bg-gray-700 gap-4 p-6 rounded-md w-full max-w-sm shadow-lg'>
        <form action="" onSubmit={submitdata} className='flex flex-col gap-4'>
          <h1 className='text-2xl font-semibold text-white '>Login</h1>
          
          <div className='flex flex-col'>
            <label className='text-gray-400 text-md mb-1' htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={data.email}
              onChange={changeHandler}
              placeholder='Enter your email' 
              name='email' 
               
              required 
              className='p-2 bg-zinc-300 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-400 text-sm mb-1' htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder='Enter your password' 
              value={data.password}
              onChange={changeHandler}
              name='password' 
              required 
              className='p-2 bg-zinc-300 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
          </div>

          <button 
            type="submit" 
            className='bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-all'>
            Submit
          </button>

          <div className='text-center text-white text-sm'>
            <p>Or</p>
            <p>
              Don't have an account? 
              <Link 
                to='/signup' 
                className='text-blue-400 hover:text-blue-500 underline ml-1'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
