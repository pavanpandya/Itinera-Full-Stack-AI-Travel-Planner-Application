import React from "react";
import { Link } from "react-router";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => (
          <div className="hover:scale-105 transition-all cursor-pointer">
            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${item?.hotel_name}`}
              target="_blank"
            >
              <img
                src="https://placehold.co/600x400.png"
                alt="hotel_image"
                className="rounded-xl"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{item?.hotel_name}</h2>
                <h2 className="text-sm text-gray-500">
                  📍{item?.hotel_address}
                </h2>
                <h2 className="text-sm">💰{item?.price}</h2>
                <h2 className="text-sm">⭐{item?.rating} stars</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
