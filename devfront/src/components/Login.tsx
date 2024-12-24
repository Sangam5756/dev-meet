import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Login = () => {
  interface formInput {
    emailId: string;
    password: string;
  }

  const [formData, setFormData] = useState<formInput>({
    emailId: "",
    password: "",
  });

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login",formData,{withCredentials:true})

      console.log(response);

    } catch (error) {
      console.log(error);
    }

    console.log("formeData",formData);
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
