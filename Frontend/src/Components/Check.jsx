import React from 'react';
import Spline from '@splinetool/react-spline';

const Check = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src="book-image-url" alt="Book" className="w-16 h-20 object-cover rounded-md mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Book Title</h2>
            <p className="text-sm text-gray-600">Author Name</p>
            <p className="text-sm text-gray-600">$20.00</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-700">Delete</button>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Price:</span>
          <span className="text-lg font-semibold">$20.00</span>
        </div>
      </div>
    </div>
  );
};

export default Check;
