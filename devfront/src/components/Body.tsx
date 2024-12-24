import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { useFetchUser } from "../hooks/useFetchUser";

const Body = () => {

  const fetchUser = useFetchUser();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
