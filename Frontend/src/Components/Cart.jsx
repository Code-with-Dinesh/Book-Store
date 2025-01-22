import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [mycart, setMyCart] = useState([]);
  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

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

  const deleteHandler = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/deletecartbook/${id}`,
        {},
        { headers }
      );
      setMyCart(response.data);
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
      toast.error("Failed to delete item");
    }
  };

  const placeOrder = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,  // Get token from localStorage
    };
    try {
      // Send the 'mycart' state in the request body
      const response = await axios.post(
        'http://localhost:4000/api/v1/placeorder',
        { order: mycart },  // Send 'mycart' as the 'order' field in the body
        { headers }
      );

      console.log('Order placed successfully:', response.data);
      toast.success("Order placed successfully");

    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="bg-zinc-800 p-4 min-h-screen flex flex-col">
      {/* When the cart is empty */}
      {(!mycart || mycart.length === 0) && (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
          <p className="text-white text-2xl font-semibold">Cart is Empty</p>
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
          <div className="border-t flex items-center justify-end p-4 sm:p-6 md:mr-10 lg:mr-16 border-gray-600">
            <div className="flex flex-col items-center w-full sm:w-[60%] md:w-[40%] lg:w-[30%] p-5 bg-gray-800 rounded-lg text-center shadow-lg">
              <span className="text-lg font-bold text-white mb-3">
                Quantity: {mycart.length}
              </span>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center justify-center">
                <span className="text-lg font-semibold text-gray-200">Total Price:</span>
                <span className="text-lg font-bold text-white">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div>
                <button onClick={placeOrder} className="bg-black hover:bg-gray-900 px-6 py-2 rounded-md font-bold text-white mt-5 transition-all duration-300">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Move ToastContainer here to ensure only one instance */}
      <ToastContainer />
    </div>
  );
};

export default Cart;
