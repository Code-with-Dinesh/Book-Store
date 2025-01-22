import React from 'react';
import Loader from '../../pages/Loader';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
const Sidebar = ({ userdata }) => {
  return (
    <div className="bg-zinc-700 rounded-md relative p-4 h-[65vh] md:h-[77vh] text-white flex flex-col">
      {!userdata && <Loader />}
      {userdata && (
        <div className="flex-1 flex flex-col">
          {/* User Info Section */}
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={userdata.avatar}
              alt="User Avatar"
            />
            <div>
              <p className="text-lg font-semibold">{userdata.username}</p>
              <p className="text-sm text-gray-300">{userdata.email}</p>
            </div>
            {/* Floating Icons */}
            <div className="absolute top-2 right-5 md:right-6 md:top-40 flex flex-col gap-5">
              <span className="p-2 cursor-pointer bg-white rounded-full shadow-md hover:shadow-lg transition">
              <Link to="/cart"> <FaShoppingCart size={25} className="text-green-500" /> </Link> 
              </span>
              <span className="p-2 cursor-pointer bg-white rounded-full shadow-md hover:shadow-lg transition">
                <MdOutlineFavorite size={25} className="text-red-500" />
              </span>
            </div>
          </div>

          {/* Address Section */}
          <div className=" mb-4  p-4 rounded-md">
            <p className="text-sm md:text-lg text-gray-400">
              Address: {userdata.address}
            </p>
          </div>

          {/* Links Section */}
          <div className="md:mt-72 space-y-3">
         
            <Link
              to="/profile/Favourites"
              className="block py-2 px-4 bg-zinc-800 hover:bg-zinc-600 rounded-lg transition"
            >
              Favourites
            </Link>
          </div>
          <button className="bg-zinc-600 mt-2 px-4 py-2 rounded-lg transition font-semibold text-white hover:bg-red-600 flex justify-center items-center gap-2">
          <span>Logout</span>
          <IoMdLogOut size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
