import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosPeople, IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";

function InfoSection({ trip }) {
  return (
    <div className="p-4 md:p-6">
      {/* Image Section */}
      <img
        src="https://placehold.co/600x400.png"
        className="h-[240px] sm:h-[300px] md:h-[340px] w-full object-cover rounded-xl"
        alt="location_image"
      />

      {/* Trip Info Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4 sm:gap-0">
        <div className="flex flex-col gap-3 w-full">
          {/* Location Title */}
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
            {trip?.userSelection?.location?.label}
          </h2>

          {/* Info Badges */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-md flex gap-2 items-center">
              <FaCalendarAlt size={18} />
              {trip?.userSelection?.noOfDays}{" "}
              {trip?.userSelection?.noOfDays > 1 ? "days" : "day"}
            </h2>
            <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-md flex gap-2 items-center">
              <RiMoneyDollarCircleFill size={18} />
              {trip?.userSelection?.budget}: Budget
            </h2>
            <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs sm:text-sm md:text-md flex gap-2 items-center">
              <IoIosPeople size={18} />
              Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        {/* Share Button */}
        <Button className="bg-primary hover:bg-primary-dark transition-all p-2 md:p-3 rounded-full flex items-center justify-center">
          <IoIosSend size={22} />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
