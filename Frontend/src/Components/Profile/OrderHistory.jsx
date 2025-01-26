import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
const OrderHistory = () => {
    const [order,setorder] = useState([])
    const role = useSelector(state =>state.auth.role)
    const headers = {
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const myorder = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/myorder`, { headers });
                console.log(response.data.data[0].book); 
                setorder(response.data.data); 
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        myorder();
    }, []); 

   
    useEffect(() => {
        console.log(order); 
    }, [order]);
  return (
   <>
   {
    role === "admin" && ( <div className="bg-zinc-800 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-700 text-white table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Book Title</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => ( 
               
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.book.title}</td>
                <td className="py-2 px-4">{order.book.price}</td>
                <td className="py-2 px-4">
                  <span
                    className={`${
                      order.status === "Placed Order"
                        ? "bg-green-500"
                        : order.status === "order placed"
                        ? "text-green-600"
                        : "bg-red-500"
                    } text-white py-2 px-3 rounded-full`}
                    
                  >
                     Placed Order
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>)
   }
   </>
  )
}

export default OrderHistory