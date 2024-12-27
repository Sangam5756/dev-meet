import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { RootState } from "../store/store";
// import { useEffect } from "react";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:RootState) => state.user);
  console.log(user)
  // Fetch login User
  
  const fetchUser = async () => {
    // if the user is present dont make api call
    // @ts-ignore
    if (user?._d) return;
    
    try {
      const res = await axios.get(BackendUrl + "/profile/view", {
        withCredentials: true,
      });
      if (res.status) dispatch(addUser(res.data));
    } catch (error:any) {
      // Navigate to login if not user
      if (error.response.status) {
        navigate("/login");
      }
      console.error(error);
    }
  };

//   useEffect(()=>{
          return  fetchUser;
//   },[])

};
