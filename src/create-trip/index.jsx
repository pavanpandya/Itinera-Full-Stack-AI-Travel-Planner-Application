import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "@/services/GenerateTrip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 8) {
      // Show toast notification
      toast.error("Trip duration cannot exceed 8 days", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill all the details", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label
      )
        .replace("{budget}", formData?.budget)
        .replace("{duration}", formData?.noOfDays)
        .replace("{groupType}", formData?.traveler);

      // console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      // console.log(result?.response?.text());
      await SaveAITrip(result?.response?.text());
    } catch (error) {
      toast.error("Error generating trip. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (coderesponse) => GetUserProfile(coderesponse),
    onError: (error) => console.error("Google Login Error:", error),
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const SaveAITrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();

    try {
      await setDoc(doc(db, "trips", docID), {
        id: docID,
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user.email,
      });

      // Show success toast notification after trip is saved
      toast.success("Trip generated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to view trip page
      navigate(`/view-trip/${docID}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Error saving trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value: place,
              onChange: (selectedPlace) => {
                setPlace(selectedPlace);
                handleInputChange("location", selectedPlace);
                // console.log(selectedPlace);
              },
              placeholder: "Start typing your destination...",
            }}
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
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Trip Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your budget for the trip?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who will you be traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.traveler == item.people && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex my-10 justify-end">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        {/* Dialog Box */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle className="sr-only">Sign In With Google</DialogTitle>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <span>
                  Sign in to the application using Google Auth Security
                </span>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="w-7 h-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default CreateTrip;
