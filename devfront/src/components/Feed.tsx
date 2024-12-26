import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";




const Feed = () => {
  const dispatch = useDispatch();
  // const feed = useSelector((state) => state?.feed);
  const [feed,setFeed] = useState(null);
  const getFeed = async () => {
    if(feed !== null) return;
    try {
      const response = await axios.get(BackendUrl + "/feed", {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addFeed(response?.data?.user));
      setFeed(response?.data?.user)
    } catch (error) {
      console.log(error);
    }
  };

  const changeFeed = (userId) => {
    const newFeed = feed?.filter((user) => user._id !== userId);
    setFeed(newFeed);  // Update state with the new feed
  };


  useEffect(() => {
    getFeed();
    
  }, []);


  if (feed?.length === 0) {
    return <h1 className="text-center my-10">No New Users Found</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      { feed &&  <UserCard user={feed[0]} changeFeed ={changeFeed} />}
    </div>
  );
};

export default Feed;
