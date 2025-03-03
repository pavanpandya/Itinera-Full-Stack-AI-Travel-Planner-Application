import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.place_name}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src="https://placehold.co/600x400.png"
          alt="place_image"
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div className="space-y-2">
          <h2 className="font-bold text-lg">{place?.place_name}</h2>
          <p className="text-sm text-gray-500">{place?.place_details}</p>
          <h2 className="text-sm">⌛{place?.travel_time}</h2>
          <Button className="p-2 md:p-3 rounded-full flex items-center justify-center cursor-pointer">
            View on Map 🗺️
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
