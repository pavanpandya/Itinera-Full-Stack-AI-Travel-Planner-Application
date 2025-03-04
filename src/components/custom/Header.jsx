import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // console.log("Stored User Data: ", JSON.parse(storedUser));
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

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
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            {/* Using <a> instead of <Link> because <Header /> is outside <Routes>, 
                meaning it doesn't have access to React Router’s context. 
                <Link> wouldn't work properly here, so we use <a> to navigate to "/my-trips". */}
            <a href="/create-trip">
              <Button variant={"outline"} className={"rounded-full"}>
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant={"outline"} className={"rounded-full"}>
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="user-picture"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="text-gray-800 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    googleLogout();
                    navigate("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign In
          </Button>
        )}
      </div>
      {/* Dialog Box */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle className="sr-only">Sign In With Google</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <span>Sign in to the application using Google Auth Security</span>
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
  );
}

export default Header;
