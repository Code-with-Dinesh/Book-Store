import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const [userdata,setuserdata] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(()=>{
     const userdata = async()=>{
        const response = await axios.get('http://localhost:4000/api/v1/userinfo',{
            headers:headers,
        });
        setuserdata(response.data.data)
     }
     userdata()
    },[])
  return (
    <div className="w-full px-2 h-auto md:px-12 bg-zinc-800 flex flex-col md:flex-row py-8 gap-5 text-white ">
    {/* Sidebar Section */}
    <div className="w-full md:w-1/6">
      <Sidebar userdata={userdata} />
    </div>
  
    {/* Main Content Section */}
    <div className="w-full md:w-5/6 flex flex-col">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  </div>
  
  )
}

export default Profile