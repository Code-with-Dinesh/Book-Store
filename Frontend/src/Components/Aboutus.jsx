import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-zinc-800 flex flex-col p-5 min-h-screen justify-evenly items-center">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center justify-between  px-6 py-12 w-full">
        <img
          src="https://i.pinimg.com/736x/28/64/7a/28647a1b6aa7d588d80aa10de202ed63.jpg"
          alt="Community"
          className="w-32 h-32 md:w-48 md:h-48 cursor-pointer rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,1)]"
        />
        <div className="text-center md:text-left w-4/5">
          <h2 className="text-3xl font-bold text-white mb-4">
            Explore the World of Books
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to our bookstore, where the magic of stories and the power
            of knowledge come to life! We believe books have the unique ability
            to inspire, educate, and transport readers to new worlds. Our
            mission is to nurture a community of book lovers by offering an
            extensive collection of titles across genres—whether you're into
            gripping mysteries, timeless classics, empowering self-help, or
            imaginative science fiction. At the heart of our platform is a
            commitment to exceptional service and a love for fostering
            connections through the shared joy of reading.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 w-full ">
        <div className="text-center md:text-left w-4/5">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Connect Through Stories
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Beyond being a bookstore, we’re a hub for creativity and learning.
            From author events and reading circles to personalized book
            recommendations, we aim to create an inclusive space that celebrates
            stories and the people who love them. Whether you're here to find
            your next favorite read, explore new ideas, or simply connect with
            fellow book enthusiasts, we’re excited to welcome you.
          </p>
        </div>
        <img
          src="https://i.pinimg.com/736x/63/39/c7/6339c7310f0d4b76e34e84a232323a38.jpg"
          alt="Community"
          className="w-32 h-32 md:w-48 md:h-48 cursor-pointer rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,1)]"
        />
      </div>
    </div>
  );
};

export default AboutUs;
