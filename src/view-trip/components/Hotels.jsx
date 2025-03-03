import React from "react";
import { Link } from "react-router";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => (
          <HotelCardItem hotel={item} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
