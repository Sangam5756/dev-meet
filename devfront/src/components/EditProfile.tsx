import { ChangeEvent, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { toast } from "react-toastify";
import { User } from "../utils/types";

interface editProfileProps {
  user:User
}

const EditProfile = ({ user }:editProfileProps) => {
  
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    age: user.age || 0,
    gender: user.gender || "",
    about: user.about || "",
    _id:user._id || "",
    skills:user.skills || [],
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  //   Handling the inputChange
  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle updated information
  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(BackendUrl + "/profile/edit", formData, {
        withCredentials: true,
      });
      
      toast.success(res.data.message);
      dispatch(addUser(res.data.user));

      
    } catch (error:any) {
      console.log(error)
      setError(error?.response?.data);
      toast.error(error?.response?.data)
    }
  }; 

  return (
    <div className="flex flex-wrap justify-center  my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
          <div className="card-body">
            {/* form title */}
            <h2 className="card-title justify-center">Edit Profile</h2>

            {/* First Name input */}
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  required
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.firstName}
                  onChange={handleOnchange}
                />
              </label>

              {/* LastName input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  required
                  type="text"
                  name="lastName"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.lastName}
                  onChange={handleOnchange}
                />
              </label>

              {/* User image Input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">PhotoUrl:</span>
                </div>
                <input
                  required
                  type="text"
                  name="photoUrl"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.photoUrl}
                  onChange={handleOnchange}
                />
              </label>

              {/* Age input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  required
                  type="number"
                  name="age"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.age}
                  onChange={handleOnchange}
                />
              </label>

              {/* Gender input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  name="gender"
                  value={formData?.gender}
                  onChange={handleOnchange}
                  className="select select-bordered w-fit lg:w-full lg:max-w-xs"
                >
                  <option disabled defaultValue={formData?.gender}>
                    Gender
                  </option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
              </label>

              {/* About input */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  required
                  type="text"
                  name="about"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.about}
                  onChange={handleOnchange}
                />
              </label>
            </div>
            <p className="text-red-600 text-center">{error}</p>
            {/* Login Button */}
            <div className="card-actions justify-center">
              <button
                onClick={handleSaveProfile}
                className="btn btn-primary my-2"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={formData} changeFeed={()=> null} />
    </div>
  );
};

export default EditProfile;
