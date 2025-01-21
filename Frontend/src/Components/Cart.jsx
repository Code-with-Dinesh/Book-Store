import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";

const Cart = () => {
  const [mycart, setMyCart] = useState([]);
  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/usercart', { headers });
        setMyCart(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart data:", error.response?.data || error.message);
      }
    };
    fetchCartData();
  }, [mycart]);
  
  const totalPrice = Array.isArray(mycart)
  ? mycart.reduce((acc, item) => acc + (item.price || 0), 0)
  : 0;


  // Delete a cart item
  const deleteHandler = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/deletecartbook/${id}`,
        {},
        { headers }
      );
      setMyCart(response.data);
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  // Calculate total price
 
  return (
    <div className="bg-zinc-800 p-4 min-h-screen flex flex-col">
      {/* When the cart is empty */}
      {(!mycart || mycart.length === 0) && (
        <div className="flex flex-col items-center  justify-center h-screen gap-5">
          <p className="text-white text-2xl  font-semibold">Cart is Empty</p>
          <p><BsCartXFill size={100} /></p>
        </div>
      )}

      {/* When the cart has items */}
      {mycart && mycart.length > 0 && (
        <div className="flex flex-col gap-4">
          {/* Cart Items */}
          {mycart.map((ele, index) => (
            <div key={index} className="p-4 bg-zinc-700 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <img
                    src={ele.url}
                    alt="Book"
                    className="w-20 h-24 object-cover mr-4 rounded-md"
                  />
                  <div>
                    <h2 className="text-lg text-white font-semibold">{ele.title}</h2>
                    <p className="text-sm text-gray-300">{ele.author}</p>
                    <p className="text-sm text-gray-300">₹{ele.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteHandler(ele._id)}
                  className="text-red-500 hover:text-red-700 bg-white p-2 rounded-full"
                >
                  <MdDelete size={25} />
                </button>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="border-t border-gray-600 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total Price:</span>
              <span className="text-lg font-semibold text-white">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
