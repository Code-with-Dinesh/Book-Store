import React from 'react'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Check from './Components/Check'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className='' >
       <Navbar/>
       {/* <Home/> */}
       <Check/>
       <Footer/>
    </div>
  )
}

export default App