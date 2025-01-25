import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ParticularBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.auth.isloogedIn);
    const userRole = useSelector(state => state.auth.role);
   
    const [particularBook, setParticularBook] = useState({});
   
    useEffect(() => {
        const bookData = async () => {
            const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`);
            setParticularBook(response.data.data);
        };
        bookData();
    }, [id]);

    const headers = {
      id: localStorage.getItem('id'),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Add book to the cart
    const handleCart = async () => {
        const response = await axios.post('http://localhost:4000/api/v1/cart', { id: id }, {
            headers: headers,
        });
        toast.success(response.data.message);
    };

    // Handler for adding to favorites
    const addFav = async () => {
        const response = await axios.put('http://localhost:4000/api/v1/favourite', { id: id }, {
            headers: headers,
        });
        toast.success(response.data.message);
    };

    // Delete book
    const deleteBook = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/delete/${id}`, {
                headers,
            });
            toast.success("Book deleted successfully");
            navigate("/allbooks"); 
        } catch (error) {
            console.error("Error while deleting the book:", error);
            toast.error("Failed to delete the book");
        }
    };

    return (
        <>
            <div className="flex md:min-h-[15vh] items-center bg-zinc-800 p-4 shadow-lg">
                <button className="ml-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
                    <IoMdArrowRoundBack onClick={() => navigate(-1)} size={20} color="black" />
                </button>
                <span className="text-white ml-6 text-lg font-semibold">
                    Go Back
                </span>
            </div>

            <div className="flex flex-col md:flex-row bg-zinc-800 p-4 md:items-start items-center">
                <div className="w-full md:w-1/3 p-4">
                    <img 
                        src={particularBook.url} 
                        alt={particularBook.title} 
                        className="w-[71%] ml-10 h-[70%] shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out object-cover" 
                    />
                </div>

                <div className="md:w-2/3 w-full ml-4 text-zinc-200 p-5">
                    <ToastContainer />
                    <h2 className="md:text-6xl text-2xl font-bold mb-2">{particularBook.title}</h2>
                    <p className="text-lg mb-2 flex items-center gap-3"><strong className='text-orange-400'><MdOutlineLanguage size={25} /></strong> {particularBook.lang}</p>
                    <p className="text-lg mb-2"><strong className='text-orange-400'>Description:</strong> {particularBook.desc}</p>
                    <p className="text-lg mb-2"><strong className='text-orange-400'>Price:</strong> ${particularBook.price}</p>
                    <p className="text-lg mb-2"><strong className='text-orange-400'>Author:</strong> {particularBook.author}</p>
                </div>

                {
                    loggedIn && userRole === 'user' && (
                        <div className='md:flex md:flex-col flex gap-5 mt-5 mr-5'>
                            <button onClick={addFav} className='bg-white p-2 rounded-full'>
                                <MdOutlineFavorite size={25} color='red' />
                            </button>
                            <button onClick={handleCart} className='bg-white p-2 rounded-full'>
                                <FaShoppingCart size={25} color='green' />
                            </button>
                        </div>
                    )
                }

                {
                    loggedIn && userRole === 'admin' && (
                        <div className='md:flex md:flex-col flex gap-5 mt-5 mr-5'>
                            <Link to={`/updatebook/${id}`}>
                                <button className='bg-white p-2 rounded-full'>
                                    <FaRegEdit size={25} color='blue' />
                                </button>
                            </Link>
                            <button onClick={deleteBook} className='bg-white p-2 rounded-full'>
                                <MdDelete size={25} color='red' />
                            </button>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ParticularBook;
