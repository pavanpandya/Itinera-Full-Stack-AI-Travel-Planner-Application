import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  maxOutputTokens: 8192,
  temperature: 1,
  top_p: 0.95,
  top_k: 64,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a personalized travel itinerary for the location: {location} 
            with a {budget} budget and duration of {duration} days for {groupType}. 
            Requirements: Provide at least one hotel option with full details (name, address, price, image URL, geo-coordinates, rating, and description). 
            Include an itinerary plan for each day ({duration} days), listing multiple places to visit per day. 
            Each place must include a name, details, image URL, coordinates, ticket pricing, and estimated travel time. 
            Please use accurate and up-to-date real-world data, including an image URL (ensure the image is present) and the relevant location information.
            The response should follow the provided JSON structure exactly.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
            {
                "hotels": [
                    {
                    "hotel_name": "Hotel Artemide",
                    "hotel_address": "Via Nazionale 22, Rome, 00184, Italy",
                    "price": "$250 per night",
                    "hotel_image_url": "https://example.com/hotel_artemide.jpg",
                    "geo_coordinates": {
                        "latitude": "41.9008",
                        "longitude": "12.4939"
                    },
                    "rating": "4.5",
                    "description": "A stylish hotel in the heart of Rome, featuring a rooftop terrace with panoramic city views, a spa, and elegant rooms."
                    }
                ],
                "itineraries": [
                    {
                    "day": "1",
                    "plan": [
                        {
                        "time": "9:00 AM",
                        "place_name": "Colosseum",
                        "place_details": "The iconic Roman amphitheater. Book tickets in advance to avoid long queues.",
                        "place_image_url": "https://example.com/colosseum.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8902",
                            "longitude": "12.4922"
                        },
                        "ticket_pricing": "$20",
                        "travel_time": "15 minutes by taxi"
                        },
                        {
                        "time": "12:00 PM",
                        "place_name": "Roman Forum",
                        "place_details": "Explore the ruins of the ancient Roman government and social life.",
                        "place_image_url": "https://example.com/roman_forum.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8925",
                            "longitude": "12.4853"
                        },
                        "ticket_pricing": "Included with Colosseum ticket",
                        "travel_time": "5 minutes walk from Colosseum"
                        },
                        {
                        "time": "3:00 PM",
                        "place_name": "Palatine Hill",
                        "place_details": "One of the seven hills of Rome, offering stunning views of the Roman Forum and Circus Maximus.",
                        "place_image_url": "https://example.com/palatine_hill.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8894",
                            "longitude": "12.4864"
                        },
                        "ticket_pricing": "Included with Colosseum ticket",
                        "travel_time": "10 minutes walk from Roman Forum"
                        },
                        {
                        "time": "6:00 PM",
                        "place_name": "Trastevere Dinner",
                        "place_details": "Enjoy dinner in the charming Trastevere neighborhood, known for its cobblestone streets and lively atmosphere. Numerous restaurants offer traditional Roman cuisine.",
                        "place_image_url": "https://example.com/trastevere.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8870",
                            "longitude": "12.4711"
                        },
                        "ticket_pricing": "$30-50 per person",
                        "travel_time": "20 minutes by taxi"
                        }
                    ]
                    },
                    {
                    "day": "2",
                    "plan": [
                        {
                        "time": "9:00 AM",
                        "place_name": "Vatican City",
                        "place_details": "Explore St. Peter's Basilica, the Vatican Museums, and the Sistine Chapel. Book tickets online in advance to avoid long queues. Consider a guided tour for a more enriching experience.",
                        "place_image_url": "https://example.com/vatican.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9029",
                            "longitude": "12.4534"
                        },
                        "ticket_pricing": "$30-50",
                        "travel_time": "30 minutes by metro"
                        },
                        {
                        "time": "1:00 PM",
                        "place_name": "Castel Sant'Angelo",
                        "place_details": "A towering cylindrical building with a rich history, originally built as Emperor Hadrian's mausoleum.",
                        "place_image_url": "https://example.com/castel_santangelo.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9034",
                            "longitude": "12.4562"
                        },
                        "ticket_pricing": "$15",
                        "travel_time": "10 minutes walk from Vatican City"
                        },
                        {
                        "time": "3:00 PM",
                        "place_name": "Piazza Navona",
                        "place_details": "A beautiful baroque square with stunning fountains and street performers.",
                        "place_image_url": "https://example.com/piazza_navona.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8992",
                            "longitude": "12.4733"
                        },
                        "ticket_pricing": "Free",
                        "travel_time": "20 minutes walk from Castel Sant'Angelo"
                        },
                        {
                        "time": "5:00 PM",
                        "place_name": "Pantheon",
                        "place_details": "An ancient Roman temple, now a church, known for its impressive dome.",
                        "place_image_url": "https://example.com/pantheon.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8986",
                            "longitude": "12.4769"
                        },
                        "ticket_pricing": "Free",
                        "travel_time": "5 minutes walk from Piazza Navona"
                        },
                        {
                        "time": "7:00 PM",
                        "place_name": "Dinner near the Pantheon",
                        "place_details": "Enjoy dinner at one of the many restaurants near the Pantheon. Try traditional Roman pasta dishes like Cacio e Pepe or Carbonara.",
                        "place_image_url": "https://example.com/restaurant.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8986",
                            "longitude": "12.4769"
                        },
                        "ticket_pricing": "$30-50 per person",
                        "travel_time": "Walking distance from Pantheon"
                        }
                    ]
                    },
                    {
                    "day": "3",
                    "plan": [
                        {
                        "time": "9:00 AM",
                        "place_name": "Trevi Fountain",
                        "place_details": "Toss a coin into the Trevi Fountain and make a wish. Be prepared for crowds!",
                        "place_image_url": "https://example.com/trevi_fountain.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9009",
                            "longitude": "12.4833"
                        },
                        "ticket_pricing": "Free",
                        "travel_time": "15 minutes walk from hotel"
                        },
                        {
                        "time": "10:30 AM",
                        "place_name": "Spanish Steps",
                        "place_details": "Climb the Spanish Steps for beautiful views of the city. A great spot for people-watching.",
                        "place_image_url": "https://example.com/spanish_steps.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9057",
                            "longitude": "12.4825"
                        },
                        "ticket_pricing": "Free",
                        "travel_time": "10 minutes walk from Trevi Fountain"
                        },
                        {
                        "time": "12:00 PM",
                        "place_name": "Borghese Gallery and Museum",
                        "place_details": "Home to masterpieces by Bernini and Caravaggio. Reservations are essential and must be made well in advance.",
                        "place_image_url": "https://example.com/borghese_gallery.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9147",
                            "longitude": "12.4842"
                        },
                        "ticket_pricing": "$25",
                        "travel_time": "20 minutes by taxi"
                        },
                        {
                        "time": "3:00 PM",
                        "place_name": "Borghese Gardens",
                        "place_details": "Relax and enjoy the beautiful Borghese Gardens. Rent a rowboat on the lake or simply stroll through the park.",
                        "place_image_url": "https://example.com/borghese_gardens.jpg",
                        "geo_coordinates": {
                            "latitude": "41.9158",
                            "longitude": "12.4853"
                        },
                        "ticket_pricing": "Free (rowboat rental extra)",
                        "travel_time": "Walking distance from Borghese Gallery"
                        },
                        {
                        "time": "6:00 PM",
                        "place_name": "Farewell Dinner",
                        "place_details": "Enjoy a final Roman dinner, perhaps trying a different neighborhood like Monti, known for its artisan shops and restaurants.",
                        "place_image_url": "https://example.com/farewell_dinner.jpg",
                        "geo_coordinates": {
                            "latitude": "41.8953",
                            "longitude": "12.4948"
                        },
                        "ticket_pricing": "$30-50 per person",
                        "travel_time": "20 minutes by taxi"
                        }
                    ]
                    }
                ]
            }\`\`\``,
        },
      ],
    },
  ],
});
