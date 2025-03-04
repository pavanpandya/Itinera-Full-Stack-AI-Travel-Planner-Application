import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, photoReferenceUrl } from "@/services/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const placeLabel = hotel?.hotel_name;
      if (!placeLabel) {
        console.error("No place label found in trip data");
        return;
      }

      const data = { textQuery: placeLabel };
      const res = await GetPlaceDetails(data);

      if (!res || !res.places || res.places.length === 0) {
        console.error("No places found in response", res);
        return;
      }

      const place = res.places[0];
      if (!place.photos || place.photos.length === 0) {
        console.warn("No photos available for this place", place);
        return;
      }

      // console.log("Retrieved photo info:", place.photos[3].name);
      const image_url = photoReferenceUrl.replace(
        "{NAME}",
        place.photos[3].name
      );
      // console.log(place.photos[3].name);
      // console.log("Image URL:", image_url);
      setPhotoUrl(image_url);
    } catch (error) {
      console.error("Error in GetPlacePhoto:", error);
    }
  };
  return (
    <div className="hover:scale-105 transition-all cursor-pointer">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`}
        target="_blank"
      >
        <img
          src={photoUrl ? photoUrl : "https://placehold.co/130x130"}
          alt="hotel_image"
          className="rounded-xl h-[200px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotel_name}</h2>
          <h2 className="text-sm text-gray-500">📍{hotel?.hotel_address}</h2>
          <h2 className="text-sm">💰{hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating} stars</h2>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
