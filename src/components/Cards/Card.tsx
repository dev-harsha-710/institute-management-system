import React from "react";
import { ICard } from "../../modals/CardModal";
import Button from "../Forms/Button/Button";

const Card: React.FC<ICard> = ({
  imageUrl,
  productName,
  duration,
  price,
  description,
  onClick,
}) => {
  return (
    <div className="w-full max-w-sm bg-slate-300 border border-gray-200 rounded-lg shadow-lg">
      <a href="#">
        <h5 className="text-3xl font-bold mt-5 mb-2 tracking-tight text-gray-800 text-center">
          {productName}
        </h5>
      </a>
      <hr
        className="bg-gray-500 border-none mx-5"
        style={{ height: "0.5px" }}
      />
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          // style={
          // {
          // width: "150%",
          // }
          // }
          src={imageUrl}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 text-left">
        {/* <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(duration)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            {[...Array(5 - duration)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
        </div> */}
        <span className="text-gray-800 text-lg font-semibold rounded">
          {description}
        </span>
        <div>
          <span className="text-gray-800 text-xl font-bold rounded">
            {duration} {duration == 1 ? "month" : "months"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800 ">₹{price}</span>
          <div className="w-2/4 content-end">
            <Button
              type="button"
              onClick={onClick}
              className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              name="Enroll Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
