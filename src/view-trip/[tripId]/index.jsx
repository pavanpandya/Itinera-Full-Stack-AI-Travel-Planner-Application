import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      toast.error("No such document!");
      console.log("No such document!");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Iternary - Daily Plan */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ViewTrip;
