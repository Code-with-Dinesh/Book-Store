import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import {  useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
const ParticularBook = () => {
    const { id } = useParams();
    const Navigate =  useNavigate()
   const loggedin =  useSelector(state => state.auth.isloogedIn)
   const userrole =  useSelector(state =>state.auth.role)
   
    const [particularbook,setparticularbook] = useState([])
    const [cart,setcart] = useState()
      
    useEffect(()=>{
        const bookdata = async()=>{
            const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`)
            setparticularbook(response.data.data)
        }
        bookdata()
    },[])
    const headers = {
      id:localStorage.getItem('id'),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     
   }
    // add book to the cart
    const handlercart = async() => {
      const response =  await axios.post('http://localhost:4000/api/v1/cart',{ id: id },{
        headers:headers
      })
      setcart(response.data)
      toast.success(response.data.message)
    };

    // handler add to favourites
    const addfav = async()=>{
      const response = await axios.put('http://localhost:4000/api/v1/favourite',{id:id},{
        headers:headers
      })
      toast.success(response.data.message)
    }
  return (
    <>
    <div className="flex items-center bg-zinc-800 p-4 shadow-lg">
     <button className="ml-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
    <IoMdArrowRoundBack onClick={()=>(Navigate(-1))} size={20} color="black" />
     </button>
    <span className="text-white ml-6 text-lg font-semibold">
    Go Back
  </span>
</div>
    <div className="flex flex-col bg-zinc-800  md:flex-row items-center md:items-start p-4">
      <div className="w-full  md:w-1/3 p-4 bg-zinc-800">
        <img src={particularbook.url} alt={particularbook.title} className="w-[71%] ml-10 h-[70%] shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out object-cover" />
      </div>
      {
        loggedin === true && userrole === 'user'  && (<div className=' md:flex md:flex-col flex gap-5 mt-5 mr-5'>
        <button onClick={addfav} className='bg-white p-2 rounded-full'><MdOutlineFavorite size={25} color='red'/></button>
        <button onClick={handlercart} className='bg-white p-2 rounded-full'><FaShoppingCart size={25} color='green'/></button>
      </div>)
      }
      {
        loggedin === true && userrole === 'admin'  && (<div className=' md:flex md:flex-col flex gap-5 mt-5 mr-5'>
        <button className='bg-white p-2 rounded-full'><FaRegEdit size={25} color='blue'/></button>
        <button className='bg-white p-2 rounded-full'><MdDelete size={25} color='red'/></button>
      </div>)
      }
      <div className=" md:w-2/3  text-zinc-200  w-full ml-4 p-5">
      <ToastContainer />
        <h2 className="md:text-6xl text-2xl font-bold mb-2">{particularbook.title}</h2>
        <p className="text-lg mb-2 flex items-center gap-3"><strong className='text-orange-400'><MdOutlineLanguage size={25} /></strong> {particularbook.lang}</p>
        <p className="text-lg mb-2"><strong className='text-orange-400'>Description:</strong> {particularbook.desc}</p>
        <p className="text-lg mb-2"><strong className='text-orange-400'>Price:</strong> ${particularbook.price}</p>
        <p className="text-lg mb-2"><strong className='text-orange-400'>Author:</strong> {particularbook.author}</p>
      </div>
    </div>
    </>
  )
}

export default ParticularBook