import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const Signup = () => {
  const [data, setdata] = useState({ username: '', email: '', password: '', address: '' });
  const navigate = useNavigate()
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submitdata = async (e) => {
    e.preventDefault(); 
    
    setdata({username:'',email:'',password:'',address:''})
    try {
      if(data.username === '' || data.email === '' || data.password === '' || data.address === ''){
        return alert('All Fields must be required')
      }
      const response =await axios.post('http://localhost:4000/api/v1/signup',data)
      alert(response.data.message)
      navigate('/login')
    } catch (error) {
      console.log(`Error at Frontend side while sign up ${error}`)
    }
    
  };

  return (
    <div className='bg-zinc-800 min-h-screen flex items-center justify-center px-2'>
      <div className='flex flex-col bg-gray-700 gap-4 p-5 rounded-md w-full max-w-sm shadow-lg'>
        <form onSubmit={submitdata} className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold text-white '>Signup</h1>

          <div className='flex flex-col'>
            <label className='text-gray-400 text-md mb-1' htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={data.username}
              onChange={changeHandler}
              placeholder='Enter Username'
              name='username'
              required
              className='p-2 bg-zinc-300 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

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
              value={data.password}
              onChange={changeHandler}
              placeholder='Enter your password'
              name='password'
              required
              className='p-2 bg-zinc-300 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-400 text-sm mb-1' htmlFor="address">Address</label>
            <textarea
              id="address"
              placeholder='Enter your address'
              value={data.address}
              onChange={changeHandler}
              name='address'
              rows="4"
              required
              className='p-2 rounded-md border bg-zinc-300 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'>
            </textarea>
          </div>

          <button
            type="submit"
            className='bg-blue-600 mt-3 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-all'>
            Submit
          </button>

          <div className='text-center text-white text-sm'>
            <p>Or</p>
            <p>
              Already have an account? 
              <Link
                to='/login'
                className='text-blue-400 hover:text-blue-500 underline ml-1'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
