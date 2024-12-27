import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { RootState } from "../store/store";




const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state:RootState) => state?.feed);
  // const [feed,setFeed] = useState<User[]>([]);
  console.log(feed)
  const getFeed = async () => {
        if(feed.length !==0) return;
    try {
      const response = await axios.get(BackendUrl + "/feed", {
        withCredentials: true,
      });
      
      console.log(response);
      dispatch(addFeed(response?.data?.user));
      // setFeed(response?.data?.user)
    } catch (error) {
      console.log(error);
    }
  };

  const changeFeed = (userId:string):void => {
    const newFeed = feed?.filter((user) => user._id !== userId);
    // setFeed(newFeed);  // Update state with the new feed
    dispatch(addFeed(newFeed));

  };


  useEffect(() => {
    
      getFeed();

    
  }, []);


  if (feed?.length === 0) {
    return <h1 className="text-center my-10">No New Users Found</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      { feed &&  <UserCard user={feed[0]} changeFeed={changeFeed} />}
    </div>
  );
};

export default Feed;
