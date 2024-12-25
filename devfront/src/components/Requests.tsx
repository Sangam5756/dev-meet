import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state?.requests);

  const reviewRequest = async (status: string, id: string) => {
    console.log(status, id);
    try {
      const response = await axios.post(
        BackendUrl + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(response);
    } catch (error) {}
  };

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const response = await axios.get(BackendUrl + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequest(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests?.length === 0)
    return <h1 className="text-2xl text-center my-10">No Request are Found</h1>;

  return (
    <div className="flex items-center flex-col my-10 px-5 lg:px-0">
      <h1 className="text-3xl font-bold">Connection Requests</h1>

      {requests?.map((user, key) => {
        return (
          <div
            key={user?.fromUserId?._id}
            className="flex lg:justify-between items-center bg-base-300 m-4 p-4 rounded-lg lg:w-1/2 w-full"
          >
            <div>
              <img
                src={user?.fromUserId?.photoUrl}
                alt="photo"
                className="lg:w-20 w-14 h-12 lg:h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4 ml-8 lg:mr-0">
              <h2 className="font-bold  text-xl">
                {user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}
              </h2>
              <p>
                {user?.fromUserId?.age &&
                  user?.fromUserId?.gender &&
                  user?.fromUserId?.age + ", " + user?.fromUserId?.gender}
              </p>
              <p className="">{user?.fromUserId?.about}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => reviewRequest("accepted", user?._id)}
                className="px-2 bg-pink-600 text-slate-200 rounded-md lg:btn lg:btn-secondary"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", user?._id)}
                className="px-2 bg-blue-800 text-slate-100 rounded-md lg:btn lg:btn-primary"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;