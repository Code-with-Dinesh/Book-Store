import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Loader from './../pages/Loader';

const Allbooks = () => {
  const [books, setBooks] = useState([]);
   
  useEffect(() => {
    const booksData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/allbooks');
        setBooks(response.data.data);
        console.log(books)
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };
    booksData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-zinc-800">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div
              key={index}
              className="bg-gray-800 cursor-pointer rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              {/* Wrap the image with Link and provide a dynamic path */}
              <Link to={`/book/${book._id}`}>
                <div className="bg-gray-700 rounded-t-lg flex items-center justify-center p-4">
                  <img
                    className="w-32 h-48 object-cover rounded-md"
                    src={book.url}
                    alt={book.title}
                  />
                </div>
              </Link>
              <div className="p-4 text-gray-300">
                <h3 className="text-xl font-semibold text-white">{book.title}</h3>
                <p className="mt-1">
                  <span className="font-semibold text-green-400">Author:</span> {book.author}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-green-400">Price:</span> ${book.price}
                </p>
                <button className="bg-green-600 rounded-md px-4 py-2 text-white mt-4 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Allbooks;
