import { useSelector } from "react-redux";


const Navbar = () => {
  const user = useSelector((state) => state.user);


  console.log("userdata", user);

  return (
    <div className="navbar bg-base-300 px-5">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻 DevMeet</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
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
