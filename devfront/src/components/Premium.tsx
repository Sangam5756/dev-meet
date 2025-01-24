import React from "react";

const Premium = () => {
  return (
    <div className="mt-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1>Silver MemberShip</h1>
          <ul>
            <li>chat with other people</li>
            <li>100 connection request per day</li>
            <li>Blue ticks</li>
          </ul>

          <button className="btn bg-slate-400 text-black">
            Buy Silver MemberShip
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1>Gold MemberShip</h1>
          <ul>
            <li>chat with other people unlimited</li>
            <li>unlimited connection request per day</li>
            <li>Blue ticks with gift options</li>
          </ul>

          <button className="btn bg-yellow-300 text-black">
            Buy Gold MemberShip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
