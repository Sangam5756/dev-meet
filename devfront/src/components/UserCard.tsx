const UserCard = ({ user }) => {
  // const { photoUrl, firstName, gender, lastName, age, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      {/* image url */}
      <figure>
        <img
          src={
            user?.photoUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s"
          }
          alt="avatar"
          className="w-full h-96"
        />
      </figure>
      <div className="card-body">
        {/* First Name and LastName */}
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {/* Age and Gender */}
        <div>{user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>} </div>
        <p>{user?.about || ""}</p>
        <div className="card-actions  justify-center my-5">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
