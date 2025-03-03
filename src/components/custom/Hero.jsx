import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Uncover your next dream adventure with AI:{" "}
        </span>
        personalized travel itineraries, just for you.
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your dedicated trip planner and travel curator, crafting personalized
        itineraries designed to suit your interests and budget.
      </p>
      <Link to="/create-trip">
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
