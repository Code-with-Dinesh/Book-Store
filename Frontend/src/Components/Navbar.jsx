import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import {  useSelector } from "react-redux";

const Navbar = () => {
  const [navtoggle, setnavtoggle] = useState(false);
  const isloggedin = useSelector((state) => state.auth.isloogedIn);
  console.log(isloggedin);

  const handleNavLinkClick = () => {
    setnavtoggle(false);
  };

  return (
    <>
      <nav className="bg-gray-800 z-20 relative text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            className="w-12 h-12 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt=""
          />
          <h1 className="font-semibold text-xl ">Book Store</h1>
        </div>
        <div className="hidden md:flex items-center gap-4">
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
            to="/allbooks"
            className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
          >
            <div>All Books</div>
          </Link>
          {isloggedin && (
            <>
              <Link
                to="/cart"
                className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
              >
                <div>Cart</div>
              </Link>

              <Link
                to="/profile"
                className="transition-all text-md cursor-pointer duration-300 hover:text-blue-600"
              >
                <div>Profile</div>
              </Link>
            </>
          )}

          {!isloggedin && (
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="bg-gray-700 border font-semibold hover:bg-white hover:text-black transition-all duration-300 border-blue-600 rounded-md px-3 py-1 text-white"
                activeClassName="bg-blue-600"
              >
                Log In
              </NavLink>
              <Link to="/signup">
                <button className="bg-blue-600 font-semibold border-blue-600 hover:bg-white hover:text-black transition-all duration-300 text-white px-3 py-1 rounded-md">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
        <button className="md:hidden">
          <IoMenu onClick={() => setnavtoggle(!navtoggle)} size={25} />
        </button>
      </nav>
      {navtoggle && (
        <div className="h-screen bg-gray-700 absolute top-0 left-0 w-full z-10 flex flex-col items-center justify-center">
          <Link
            to="/"
            onClick={handleNavLinkClick}
            className="transition-all text-md cursor-pointer duration-300 text-2xl mb-4 text-white font-semibold hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/allbooks"
            onClick={handleNavLinkClick}
            className="transition-all text-md cursor-pointer mb-4 text-2xl text-white font-semibold duration-300 hover:text-blue-600"
          >
            All Books
          </Link>
          <Link
            to="/aboutus"
            onClick={handleNavLinkClick}
            className="transition-all text-md cursor-pointer mb-4 text-2xl text-white font-semibold duration-300 hover:text-blue-600"
          >
            About Us
          </Link>
          {isloggedin && (
            <>
              <Link
                to="/cart"
                className="transition-all text-md cursor-pointer mb-4 text-2xl text-white font-semibold duration-300 hover:text-blue-600"
              >
                Cart
              </Link>

              <Link
                to="/profile"
                className="transition-all text-md cursor-pointer text-2xl mb-4 text-white font-semibold duration-300 hover:text-blue-600"
              >
                Profile
              </Link>
            </>
          )}
           {
           ! isloggedin && (
            <div className="flex items-center gap-4">
            <NavLink 
            onClick={handleNavLinkClick}
              to="/login"
              className="bg-gray-700 border font-semibold hover:bg-white hover:text-black transition-all duration-300 border-blue-600 rounded-md px-3 py-1 text-white"
              activeClassName="bg-blue-600"
            >
              Log In
            </NavLink>
            <Link onClick={handleNavLinkClick} to="/signup">
              <button className="bg-blue-600 font-semibold border-blue-600 hover:bg-white hover:text-black transition-all duration-300 text-white px-3 py-1 rounded-md">
                Sign up
              </button>
            </Link>
          </div>
           )
           }
        </div>
      )}
    </>
  );
};

export default Navbar;
