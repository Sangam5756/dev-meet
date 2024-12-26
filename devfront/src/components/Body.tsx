import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((state) => state?.user);

  const fetchUser = useFetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();

    if (!user?._id) {
      navigate("/login");
    }
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
