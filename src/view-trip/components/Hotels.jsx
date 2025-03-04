import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip?.tripData?.hotels) {
      setLoading(false);
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? [1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))
          : trip?.tripData?.hotels?.map((item, index) => (
              <HotelCardItem hotel={item} key={index} />
            ))}
      </div>
    </div>
  );
}

export default Hotels;
