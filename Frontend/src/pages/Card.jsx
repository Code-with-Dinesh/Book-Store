import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="bg-zinc-800  cursor-pointer p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="bg-zinc-900 flex items-center justify-center p-3 rounded-lg">
        <img className="object-cover h-48 rounded-md" src={data.url} alt="" />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-white mb-2 hover:text-blue-500">{data.title}</h1>
        <h2 className="text-md text-gray-300 mb-1">Author: <span className="text-gray-100">{data.author}</span></h2>
        <h2 className="text-md text-gray-300 mb-1">Language: <span className="text-gray-100">{data.lang}</span></h2>
        <h2 className="text-md text-gray-300 mb-3">Price: <span className="font-semibold text-blue-400">₹ {data.price}</span></h2>
      </div>
    </div>
  );
};

export default Card;
