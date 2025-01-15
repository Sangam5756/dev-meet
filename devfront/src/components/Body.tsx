import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useFetchUser } from "../hooks/useFetchUser";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";

const Body = () => {
  const user = useSelector((state: RootState) => state?.user);
  const fetchUser = useFetchUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      await fetchUser();
      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    // @ts-ignore
    if (!loading && !user?._id) {
      navigate("/login");
    }
  }, [loading, user, navigate]); // Re-run when loading or user changes

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
