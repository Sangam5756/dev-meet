import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../store/feedSlice";
import { User } from "../utils/types";
import { toast } from "react-toastify";

interface UserCardProps {
  user: User;
  changeFeed: (userId: string) => void;
}

const UserCard = ({ user,changeFeed }:UserCardProps) => {
  // const { photoUrl, firstName, gender, lastName, age, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status:string, userId:string) => {
    try {
      const response = await axios.post(
        BackendUrl + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFeed(userId));
      toast.success("request sent Successfully")
      changeFeed(userId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-88 shadow-xl">
      {/* image url */}
      <figure>
        <img
          src={
            user?.photoUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s"
          }
          alt="avatar"
          className="w-full h-32"
        />
      </figure>
      <div className="card-body">
        {/* First Name and LastName */}
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {/* Age and Gender */}
        <div>
          {user?.age && user?.gender && (
            <p>{user?.age + ", " + user?.gender}</p>
          )}{" "}
        </div>
        <p>{user?.about || ""}</p>
        <div className="card-actions  justify-center my-5">
          <button onClick={()=> handleSendRequest("ignored",user?._id)} className="btn btn-primary">Ignore</button>
          <button onClick={()=> handleSendRequest("interested",user?._id)} className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
