import React, { useState } from "react";
import Spinner from "./Spinner";

const Card = ({ doc, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(true);
  };

  return (
    <div
      className="border rounded-lg shadow-lg cursor-pointer card"
      onClick={onClick}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center mt-5 bg-white bg-opacity-75 rounded-t-lg">
            <Spinner />
          </div>
        )}
        <img
          src={doc.image}
          alt={doc.title}
          className={`object-cover w-full h-32 rounded-t-lg ${
            isLoading ? "hidden" : "block"
          }`}
          onLoad={handleImageLoad}
        />
      </div>
      <h3 className="p-2 font-semibold text-gray-500 text-start">
        {doc.title}
      </h3>
    </div>
  );
};

export default Card;
