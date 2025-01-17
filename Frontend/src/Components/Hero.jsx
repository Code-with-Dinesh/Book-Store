import React from "react";
import libremove from "../assets/libremove.png";

const Hero = () => {
  return (
    <div className=" flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-3/6  flex flex-col items-start h-full  lg:p-4 p-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-zinc-200 mt-10 md:mt-28 font-semibold leading-snug">
          Discover Stories, Knowledge, and Endless Adventures
        </h1>
        <p className="text-zinc-300 mt-4 text-sm sm:text-base">
          Discover a world of captivating stories, endless knowledge, and
          boundless imagination at our bookstore, where adventures await you.
        </p>
        <button className="border-white mt-4 border-2 rounded-full px-6 py-2 hover:bg-white hover:border-none transition-all duration-300 hover:text-black">
          Discover Your Book
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/6 flex flex-col items-center justify-center mt-10 md:mt-0">
        <img
          className="w-full  md:m-0 md:w-4/5 max-w-md object-contain"
          src={libremove}
          alt="Hero graphic"
        />
      </div>
    </div>
  );
};

export default Hero;
