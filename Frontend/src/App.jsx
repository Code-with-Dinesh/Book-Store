import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Allbooks from "./Components/Allbooks";
import Cart from "./Components/Cart";
import Aboutus from "./Components/Aboutus";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/allbooks" element={<Allbooks/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
         </Routes>
        <Footer />
      </BrowserRouter>
      
      
    </>
  );
};

export default App;
