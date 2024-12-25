import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state?.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BackendUrl + "/feed", {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addFeed(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(feed?.user[0]);

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feed?.user?.length === 0 ? (
        <>No Feed Found</>
      ) : (
        <UserCard user={feed?.user[0]} />
      )}
    </div>
  );
};

export default Feed;
