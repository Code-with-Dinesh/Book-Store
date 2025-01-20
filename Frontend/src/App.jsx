import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import {  Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Allbooks from "./Components/Allbooks";
import Cart from "./Components/Cart";
import Aboutus from "./Components/Aboutus";
import ParticularBook from "./Components/Recentadded/ParticularBook";
import { useDispatch, useSelector } from "react-redux";
import { Authactions } from "./Components/redux/navslice";
import Profile from "./Components/Profile/Profile";
import Setting from './Components/Profile/Setting'
import Userprofile from './Components/Profile/Userprofile'
import Favourite from './Components/Profile/Favourite'
const App = () => {
  const dispatch = useDispatch()
  const role = useSelector(state =>state.auth.role)
  useEffect(()=>{
    if(localStorage.getItem("id") &&
        localStorage.getItem('role') &&
        localStorage.getItem('token')
  ){
      dispatch(Authactions.login())
      dispatch(Authactions.userrole(localStorage.getItem('role')))
  }
  },[])
  return (
    <>
       
        <Navbar />
        <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/allbooks" element={<Allbooks/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/profile" element={<Profile/>}> 
        <Route  path="/profile/setting" element={<Setting/>} />
        <Route path="/profile/orderHistory" element={<Userprofile/>}/>
        <Route index path="/profile/Favourites" element={<Favourite/>}/>

        </Route>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path='/book/:id' element={<ParticularBook/>}/>
         </Routes>
        <Footer />
     
      
      
    </>
  );
};

export default App;
