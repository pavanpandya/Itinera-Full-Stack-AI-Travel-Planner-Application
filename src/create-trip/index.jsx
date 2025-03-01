import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateTrip() {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🏝️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Share a few details with us, and let our trip planner craft a
        personalized itinerary that perfectly matches your unique travel style.
      </p>

      {/* Form */}
      <div className="mt-16 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of your choice?
          </h2>
          {/* To-Do: Integrate Google Autocomplete Place Library */}
          <Input
            placeholder="Enter your destination (Ex. Bali, Indonesia)"
          />
        </div>

        {/* Trip Duration Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How long do you plan to travel?
          </h2>
          <Input
            placeholder="Enter your trip duration (Ex. 3)"
            type="number"
          />
        </div>

        {/* Trip Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your budget for the trip?
          </h2>
          <div className="flex gap-6">
            <button type="button">Low</button>
            <button type="button">Medium</button>
            <button type="button">High</button>
          </div>
        </div>

        {/* Members */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who will you be traveling with on your next adventure?
          </h2>
          <div className="flex gap-6">
            <button type="button">Solo</button>
            <button type="button">Couple</button>
            <button type="button">Family</button>
            <button type="button">Friends</button>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex my-10 justify-end">
          <Button>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
