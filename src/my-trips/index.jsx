import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      GetUserTrips(user.email);
    }
  }, [user]);

  const GetUserTrips = async (userEmail) => {
    setLoading(true);
    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      trips.push(doc.data());
    });
    setUserTrips(trips);
    setLoading(false);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))
          : userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))
          : null}
      </div>
    </div>
  );
}

export default MyTrips;
