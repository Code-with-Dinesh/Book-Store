import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateBook = () => {
  const { id } = useParams(); 
  const Navigate = useNavigate()
  console.log(id)
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId:id
  };

  const [data, setdata] = useState({
    title: "",
    url: "",
    desc: "",
    price: "",
    author: "",
    lang: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Book Data:", data);

    // Validate the required fields
    if (!data.title || !data.url || !data.desc || !data.price || !data.author || !data.lang) {
      toast.error("Please fill in all the fields!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/updatebook`,
        {
            id,
            ...data,
        },
        { headers }
      );
     
      toast.success("Book updated successfully!");
      Navigate(`/book/${id}`)
      
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book.");
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`, {
          headers, 
        });
        setdata(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
        toast.error("Failed to fetch book data.");
      }
    };

    fetchBookData();
  }, [id]); 

  return (
    <div className="bg-zinc-800 p-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-4 bg-zinc-700 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Update Book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
            URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-zinc-600 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            name="url"
            value={data.url}
            type="text"
            placeholder="Enter book URL"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none bg-zinc-600 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={data.title}
            placeholder="Enter book title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
            Description
          </label>
          <textarea
            className="shadow appearance-none bg-zinc-600 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="desc"
            name="desc"
            value={data.desc}
            placeholder="Enter book description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lang">
            Language
          </label>
          <input
            className="shadow appearance-none bg-zinc-600 border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="lang"
            name="lang"
            value={data.lang}
            type="text"
            placeholder="Enter book language"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            className="shadow appearance-none border bg-zinc-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            name="author"
            value={data.author}
            type="text"
            placeholder="Enter book author"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border bg-zinc-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            value={data.price}
            type="number"
            placeholder="Enter book price"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Book
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateBook;
