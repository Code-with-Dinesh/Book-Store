import React from 'react';
import Spline from '@splinetool/react-spline';

const Check = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center p-4 h-screen">
      <main className="w-[40%] p-4 border-transparent h-screen relative cursor-pointer ">
      <Spline className='' scene="https://prod.spline.design/0ug3ugewLSg448XV/scene.splinecode" />
  
        {/* Overlay to hide the watermark */}
        <div className="absolute bottom-0 right-0  bg-black w-full h-20"></div>
      </main>
      <h1 className="ml-5 text-lg font-bold">Home ejs</h1>
    </div>
  );
};

export default Check;
