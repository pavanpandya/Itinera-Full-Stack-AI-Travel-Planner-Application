export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "Explore alone, your way",
    icon: "👤",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Perfect getaway for two",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun for all ages",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Memories with your squad",
    icon: "👯‍♂️",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Affordable yet great",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced budget experience",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium, lavish travel",
    icon: "💎",
  },
];

export const AI_PROMPT = `Generate a personalized travel itinerary for the location: {location} 
  with a {budget} budget and duration of {duration} days for {groupType}.  
  
  **The response must be in the following JSON format:**  
  
  {
  "hotels": [
    {
      "hotel_name": "{hotel_name}",
      "hotel_address": "{hotel_address}",
      "price": "{hotel_price}",
      "hotel_image_url": "{hotel_image_url}",
      "geo_coordinates": {
        "latitude" : "{latitude}" ,
        "longitude": "{longitude}"
      },
      "rating": "{hotel_rating}",
      "description": "{hotel_description}"
    }
  ],
  "itineraries": [
    {
      "day": "{day_number}",
      "plan": [
        {
          "time": "{time_of_day}",
          "place_name": "{place_name}",
          "place_details": "{place_description}",
          "place_image_url": "{place_image_url}",
          "geo_coordinates": {
            "latitude" : "{latitude}" ,
            "longitude": "{longitude}"
          },
          "ticket_pricing": "{ticket_price}",
          "travel_time": "{travel_time_from_hotel_to_place}"
        }
      ]
    }
  ]
}
  
  **Requirements:**  
  - Provide at least one hotel option with full details (name, address, price, image URL, geo-coordinates, rating, and description).  
  - Include an itinerary plan for each day ({duration} days), listing multiple places to visit per day.  
  - Each place must include a name, details, image URL, coordinates, ticket pricing, and estimated travel time.  
  - Please use accurate and up-to-date real-world data, including an image URL (ensure the image is present) and the relevant location information.
  - The response should follow the provided JSON structure exactly.`;
