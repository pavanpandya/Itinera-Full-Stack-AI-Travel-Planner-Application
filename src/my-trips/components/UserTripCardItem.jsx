import React, { useEffect, useState } from "react";
import { GetPlaceDetails, photoReferenceUrl } from "@/services/GlobalApi";
import { Link } from "react-router";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip?.userSelection?.location?.label]);

  const GetPlacePhoto = async () => {
    try {
      const placeLabel = trip?.userSelection?.location?.label;
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
      console.log("Image URL:", image_url);
      setPhotoUrl(image_url);
    } catch (error) {
      console.error("Error in GetPlacePhoto:", error);
    }
  };
  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "https://placehold.co/130x130"}
          alt="location-image"
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} days with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
