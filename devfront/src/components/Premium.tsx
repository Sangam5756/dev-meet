// import React from "react";

// const Premium = () => {
//   return (
//     <div className="mt-10">
//       <div className="flex w-full">
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1>Silver MemberShip</h1>
//           <ul>
//             <li>chat with other people</li>
//             <li>100 connection request per day</li>
//             <li>Blue ticks</li>
//           </ul>

//           <button className="btn bg-slate-400 text-black">
//             Buy Silver MemberShip
//           </button>
//         </div>
//         <div className="divider divider-horizontal">OR</div>
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1>Gold MemberShip</h1>
//           <ul>
//             <li>chat with other people unlimited</li>
//             <li>unlimited connection request per day</li>
//             <li>Blue ticks with gift options</li>
//           </ul>

//           <button className="btn bg-yellow-300 text-black">
//             Buy Gold MemberShip
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Premium;
import axios from "axios";
import { BackendUrl } from "../constants/Api";

const Premium = () => {

  const handleBuyClicked = async (type: any) => {
    const order = await axios.post(BackendUrl + "/payment/create", {
      membershiptype: type
    }, {
      withCredentials: true
    })


    console.log(order)

    const options = {
      key: order?.data?.keyId, // Enter the Key ID generated from the Dashboard
      amount: order?.data?.order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order?.data?.order?.currecy,
      name: "Dev Meet",
      description: "Connect to other developer",
      order_id: order?.data?.order?.orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: order?.data?.order?.notes?.firstName + order?.data?.order?.notes?.lastName,

      },
      notes: order?.data?.order?.notes,
      theme: {
        color: "#3399cc"
      }
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open()

  }



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

          <button onClick={() => handleBuyClicked('silver')} className="btn bg-slate-400 text-black">
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

          <button onClick={() => handleBuyClicked('gold')} className="btn bg-yellow-300 text-black">
            Buy Gold MemberShip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
