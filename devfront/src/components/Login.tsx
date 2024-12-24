import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { LoginInput } from "../utils/types";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../utils/constant";

const Login = () => {
  const [formData, setFormData] = useState<LoginInput>({
    emailId: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      return navigate("/feed");
    } catch (error) {
      console.log(error);
    }

    console.log("formeData", formData);
  };

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
                type="password"
                name="password"
                className="input input-bordered w-full max-w-xs"
                value={formData.password}
                onChange={handleOnchange}
              />
            </label>
          </div>
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
