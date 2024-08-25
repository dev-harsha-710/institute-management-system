import React from "react";
import { ICourse } from "../../modals/CardModal";
import Button from "../Forms/Button/Button";

const Card: React.FC<ICourse> = ({
  id,
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
        <img className="p-8 rounded-t-lg" src={imageUrl} alt="product image" />
      </a>
      <div className="px-5 pb-5 text-left">
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
              onClick={() =>
                onClick({
                  id,
                  imageUrl,
                  productName,
                  duration,
                  price,
                  description,
                })
              }
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
