import axios from "axios";
import { useEffect } from "react";
import { BackendUrl } from "../constants/Api";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BackendUrl + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.count === 0 || connections.length === 0) {
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="flex items-center flex-col my-10 px-5 lg:px-0">
      <h1 className="text-3xl font-bold">Connections</h1>

      {connections?.map((user, key) => {
        return (
          <div
            key={user?._id}
            className="flex  items-center bg-base-300 m-4 p-4 rounded-lg lg:w-1/2 w-full"
          >
            <div>
              <img
                src={user?.photoUrl}
                alt="photo"
                className="lg:w-20 w-14 h-12 lg:h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4 ml-8 lg:mr-0">
              <h2 className="font-bold  text-xl">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <p>
                {user?.age && user?.gender && user?.age + ", " + user?.gender}
              </p>
              <p className="">{user?.about}</p>
            </div>
          
          </div>
        );
      })}
    </div>
  );
};

export default Connections;