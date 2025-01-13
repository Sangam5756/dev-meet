import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  // const user = useSelector((state: RootState) => state?.user);
  // const fetchUser = useFetchUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUser();
  //   // @ts-ignore
  //   if (!user?._id) {
  //     navigate("/login");
      
  //   }
  // }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
