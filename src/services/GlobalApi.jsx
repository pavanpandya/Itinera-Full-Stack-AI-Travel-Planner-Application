const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id",
  },
};

export const GetPlaceDetails = async (data) => {
  try {
    const response = await fetch(BASE_URL, {
      ...config,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const photoReferenceUrl =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
