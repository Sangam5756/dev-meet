import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { RootState } from "../store/store";

const Profile = () => {
  const user = useSelector((state:RootState) => state.user);
  
  return <div> {user && <EditProfile user={user} />}</div>;
};

export default Profile;
