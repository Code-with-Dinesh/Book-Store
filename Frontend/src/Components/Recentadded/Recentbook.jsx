import React, { useEffect, useState } from 'react'
import Card from '../../pages/Card'
import axios from 'axios';
import Loader from '../../pages/Loader';
import { Link } from 'react-router-dom';
const Recentbook = () => {
   const [book,setbook]  = useState()

   useEffect(()=>{
    const recentbook = async()=>{
        const response = await axios.get('http://localhost:4000/api/v1/recentbook')
        setbook(response.data.data)
    }
    recentbook()
   },[])
  return (
    <div className="mt-5 font-semibold">
  <h1 className="text-xl md:text-3xl mb-5 text-gray-300">Recently Added Books</h1>

  
  {!book ? (
    <Loader />
  ) : (
    
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-zinc-800">
      {book.length > 0 ? (
        book.map((ele, index) => (
         <Link to={`/book/${ele._id}`}> <Card key={index} data={ele} /></Link>
        ))
      ) : (
        <p className="text-gray-300">No books available</p> // Show a message if book array is empty
      )}
    </div>
  )}
</div>
  )
}

export default Recentbook