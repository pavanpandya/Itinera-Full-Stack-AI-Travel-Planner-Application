import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/services/GlobalApi";

const photoReferenceUrl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const placeLabel = place?.place_name;
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

      console.log("Retrieved photo info:", res.places[0].photos[3].name);
      const image_url = photoReferenceUrl.replace(
        "{NAME}",
        res.places[0].photos[3].name
      );
      console.log(res.places[0].photos[3].name);
      console.log("Image URL:", image_url);
      setPhotoUrl(image_url);
    } catch (error) {
      console.error("Error in GetPlacePhoto:", error);
    }
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.place_name}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl}
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
