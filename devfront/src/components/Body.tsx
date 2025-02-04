import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useFetchUser } from "../hooks/useFetchUser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Body = () => {
  const fetchUser = useFetchUser();
  const [loading, setLoading] = useState(false); // State for loading
  const user = useSelector((state: RootState) => state?.user);
  console.log(user)
    const navigate = useNavigate();
  useEffect(() => {
    
    // Fetch user data when component mounts
    // @ts-ignore
    if(user?._id)  navigate("/login");
    const fetchUserData = async () => {
      await fetchUser();
      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchUserData();
    // @ts-ignore
  }, []); // Re-run when user changes

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
