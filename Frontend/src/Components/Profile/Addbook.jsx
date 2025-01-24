import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Addbook = () => {
    const headers = {
        id: localStorage.getItem('id'),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const [book, setBook] = useState({
        title: "",
        url: "",
        desc: "",
        price: "",
        author: "",
        lang: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Book Data:", book);
        
        // Validate the required fields
        if (!book.title || !book.url || !book.desc || !book.price || !book.author || !book.lang) {
            toast.error("Please fill in all the fields!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/v1/createbook', book, {
                headers: headers,
            });
            console.log(response);
            toast.success("Book added successfully!");
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-700 rounded-md p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-zinc-400 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h1 className="text-2xl font-bold text-gray-700 text-center">Add New Book</h1>

                {/* Book Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Book Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Enter book title"
                        className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-700"
                        required
                    />
                </div>

                {/* Book URL */}
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        Book URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={book.url}
                        onChange={handleChange}
                        placeholder="Enter book URL"
                        className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-700"
                        required
                    />
                </div>

                {/* Book Description */}
                <div>
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                        Book Description
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={book.desc}
                        onChange={handleChange}
                        placeholder="Enter book description"
                        rows="4"
                        className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-700"
                        required
                    ></textarea>
                </div>

                {/* Book Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Book Price (USD)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        placeholder="Enter book price"
                        className="w-full mt-1 px-4 py-2 bg-zinc-700 rounded-lg"
                        required
                    />
                </div>

                {/* Book Author */}
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Book Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Enter book author"
                        className="w-full mt-1 px-4 py-2 bg-zinc-700 rounded-lg"
                        required
                    />
                </div>

                {/* Book Language */}
                <div>
                    <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
                        Book Language
                    </label>
                    <select
                        id="lang"
                        name="lang"
                        value={book.lang}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-700"
                        required
                    >
                        <option value="">Select language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Add Book
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Addbook;
