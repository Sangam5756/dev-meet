import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useFetchUser } from "../hooks/useFetchUser";
import { useEffect, useState } from "react";

const Body = () => {
  const fetchUser = useFetchUser();
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      await fetchUser();
      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   // Redirect to login page if user is not authenticated
  //   // @ts-ignore
  //   // if (!loading && !user?._id) {
  //   //   navigate("/login");
  //   // }
  // }, [loading, user]); // Re-run when loading or user changes

  return (
    <div>
      <Navbar />
      {loading && <div className="flex justify-center  h-[50vh]"><span className="loading flex loading-spinner loading-lg"></span></div>}
      {!loading && <Outlet />}
      <Footer />
    </div>
  );
};

export default Body;
