import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../constants/Api";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handlelogout = async () => {
    try {
      const res = await axios.get(BackendUrl + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="navbar bg-base-300 px-5">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          👨‍💻 DevMeet
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
        </div>
        {user && (
          <div className="dropdown dropdown-end ">
            <div className="flex items-center">
              <p className="px-4">Welcome, {user?.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-1 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={Handlelogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
