import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";

const ParticularBook = () => {
    const { id } = useParams();
    const Navigate =  useNavigate()
    console.log(id)
    const [particularbook,setparticularbook] = useState([])

    useEffect(()=>{
        const bookdata = async()=>{
            const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`)
            setparticularbook(response.data.data)
        }
        bookdata()
    })
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
      <div className=" md:w-2/3  text-zinc-200  w-full ml-4 p-5">
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