import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { LoginInput } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BackendUrl } from "../constants/Api";

const Login = () => {
  const [formData, setFormData] = useState<LoginInput>({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useLocation();

  //   Handling the inputChange
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Submitting the data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/login`, formData, {
        withCredentials: true,
      });

      dispatch(addUser(response.data.user));

      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  // when the path is login and user is login so navigate him to home page

  useEffect(() => {
    if (params?.pathname === "/login" && user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
        <div className="card-body">
          {/* form title */}
          <h2 className="card-title justify-center">Login</h2>

          {/* username input */}
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                required
                type="email"
                name="emailId"
                className="input input-bordered w-full max-w-xs"
                value={formData.emailId}
                onChange={handleOnchange}
              />
            </label>
            {/* password input */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                required
                type="password"
                name="password"
                className="input input-bordered w-full max-w-xs"
                value={formData.password}
                onChange={handleOnchange}
              />
            </label>
          </div>
          <p className="text-red-600 text-center">
            {error || "Something Went Wrong"}
          </p>
          {/* Login Button */}
          <div className="card-actions justify-center">
            <button onClick={handleSubmit} className="btn btn-primary my-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
