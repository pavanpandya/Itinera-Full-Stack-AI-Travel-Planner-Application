import React, { useState, useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip?.tripData?.itineraries) {
      setLoading(false);
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {loading
          ? [1, 2, 3].map((_, index) => (
              <div key={index} className="mt-5">
                {/* Skeleton loading for the day */}
                <div className="h-[30px] w-32 bg-slate-200 animate-pulse rounded-md mb-4"></div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Skeleton loading for places */}
                  {[1, 2].map((_, index) => (
                    <div key={index} className="my-3">
                      <div className="h-[20px] w-24 bg-slate-200 animate-pulse rounded-md mb-2"></div>
                      <div className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : trip?.tripData?.itineraries?.map((item, index) => (
              <div key={index} className="mt-5">
                <h2 className="font-medium text-lg">Day {item.day}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {item.plan.map((place, index) => (
                    <div key={index} className="my-3">
                      <h2 className="font-medium text-sm text-orange-600">
                        {place.time}
                      </h2>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
