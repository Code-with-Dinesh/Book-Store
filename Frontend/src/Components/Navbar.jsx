import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-gray-800  text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center  justify-center">
        <img
          className="w-12 h-12 me-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt=""
        />
        <h1 className="font-semibold text-xl ">Book Store</h1>
      </div>
      <div className="flex items-center gap-4 ">
        <Link
          to="/"
          className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
        >
          <div>Home</div>
        </Link>
        <Link
          to="/aboutus"
          className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
        >
          <div>About Us</div>
        </Link>
        <Link
          to="/cart"
          className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
        >
          <div>Cart</div>
        </Link>
        <Link
          to="/allbooks"
          className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
        >
          <div>All Books</div>
        </Link>
        <Link
          to="/profile"
          className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
        >
          <div>Profile</div>
        </Link>

        <div className=" flex items-center gap-4">
          <NavLink
            to="/login"
            className="bg-gray-700 border font-semibold hover:bg-white hover:text-black transition-all duration-300 border-blue-600 rounded-md px-3 py-1 text-white"
            activeClassName="bg-blue-600" // Apply this class when the link is active
          >
            Log In
          </NavLink>{" "}
         <Link to="/signup"> <button className="bg-blue-600 font-semibold border-blue-600  hover:bg-white hover:text-black transition-all duration-300 text-white px-3 py-1 rounded-md">
            Sign up
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
