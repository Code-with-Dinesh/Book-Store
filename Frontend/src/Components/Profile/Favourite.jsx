import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../pages/Card'
import imagebook from '../../assets/no-bookmark.png'

const Favourite = () => {
  const [favbook,setfavbook] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   
 }
  useEffect(()=>{
    const userfavbook =  async()=>{
      const response  = await axios.get('http://localhost:4000/api/v1/getfavbook',{
        headers:headers
      })
      setfavbook(response.data.data)
    }
    userfavbook()
  },[favbook])
  
  return (
    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6'>
  {
   favbook && favbook.length > 0 ? (
    favbook.map((item, index) => (
      <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg relative transform transition duration-300 hover:scale-105">
        <Card data={item} favourite={true} />
      </div>
        
      ))
    ) : (
      <>
      <div className=" flex-col items-center justify-center mt-5">
  <div className=' flex flex-col items-center justify-center mx-auto md:mx-auto w-[50vw] md:w-[70vw] '>
    <p className="text-white text-center col-span-full text-lg md:text-2xl">No Books Added to Favourites</p>
    <img className='w-64' src={imagebook} alt="No books" />
  </div>
</div>

      </>
    )
  }

</div>

  )
}

export default Favourite