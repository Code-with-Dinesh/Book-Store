import React from 'react'

const Navbar = () => {
    const links = [
        {
           title:'Home',
           link:'/' 
        },
        {
            title:'About Us',
            link:'/aboutus'
        },
        {
            title:'Cart',
            link:'/cart'
        },
        {
            title:'All Books',
            link:'/allbooks'
        },
        {
            title:'Profile',
            link:'/profile'
        }
    ]
  return (
    <div className='bg-gray-800 text-white px-8 py-2 flex items-center justify-between'>
        <div className='flex items-center  justify-center'>
            <img className='w-12 h-12 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="" />
            <h1 className='font-semibold text-xl '>Book Store</h1>
        </div>
        <div className='flex items-center gap-4 '>
            {
                links.map((ele,index)=>(
                    <div className='transition-all text-md cursor-pointer duration-300 hover:text-blue-600' key={index}>{ele.title}</div>
                ))
            }

            <div className=' flex items-center gap-4'>
                <button className='bg-gray-700 border font-semibold hover:bg-white hover:text-black transition-all duration-300 border-blue-600 rounded-md px-3 py-1 text-white'>Log In</button>
                <button className='bg-blue-600 font-semibold border-blue-600  hover:bg-white hover:text-black transition-all duration-300 text-white px-3 py-1 rounded-md'>Sign up</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar