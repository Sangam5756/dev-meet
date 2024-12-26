import { ChangeEvent, FormEvent, useState } from "react";
import { SigninInput } from "../utils/types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendUrl } from "../constants/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState<SigninInput>({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e:FormEvent) => {
    setError("");
    if(formData.emailId ==="" || formData.password ==="" || formData.firstName==="" || formData.lastName ==="") {
      setError("Email and Password & firstName & lastName is Required");
      return toast.warning("Email and Password & firstName & lastName is Required");
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        BackendUrl + "/signup",
        { formData },
        { withCredentials: true }
      );
      console.log(response);
      if (response?.status === 200) {
          toast.success(response?.data?.message)
          dispatch(addUser(response?.data?.data))
        navigate("/profile");
      }
    } catch (error:any) {
      setError(error?.response?.data);
    }

    console.log(formData);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
        <div className="card-body">
          {/* form title */}
          <h2 className="card-title justify-center">Signup</h2>

          {/* FirstName input */}
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
            {/* lastName input */}
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
            {error}
          </p>
          {/* Login Button */}
          <div className="card-actions justify-center">
            <button onClick={handleSubmit} className="btn btn-primary my-2">
              Signup
            </button>
          </div>
          <p>
            Already have an Account{" "}
            <Link className="text-blue-800" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
