// @ts-ignore
const MessageBox = ({ message, user }) => {
  console.log(message);
  console.log(user);
  // @ts-ignore
  function getFirstLetter(name) {
    return name.charAt(0).toUpperCase();
  }
  const username = getFirstLetter(message?.firstName);
  const theme = "light";
// @ts-ignore
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!"); // Optional: Add a notification.
    });
  };

  return (
    <div className="">
      <div
        className={`chat flex flex-col  ${
          user.firstName === message.firstName ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-header items-center flex py-2">
          {/* avatar */}
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
              <span className="text-xl">{username}</span>
            </div>
          </div>
          {/* username */}
          <div
            className={`rounded ml-2  text-sm ${
              theme ? "text-green-500 " : "text-black"
            }`}
          >
            {message.firstName}
          </div>
          {user.firstName !== message.firstName && (
          <div
            className="chat-footer opacity-50 px-3  bg-gray hover:bg-black hover:text-white rounded-full py-1 cursor-pointer"
            onClick={() => handleCopy(message.text)}
          >
            {/* < /> Copy Icon */}
            copy
          </div>
        )}
        </div>

        <div className="flex flex-col">
          <div
            className={` ${
              theme ? "text-white " : "text-black  shadow-md"
            } rounded-lg p-3 shadow-md max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl overflow-x-auto`}
          >
            {/* {message.message} */}
            <pre className="text-sm sm:text-base md:text-lg">
              <code className="break-words text-sm">{message.text}</code>
            </pre>
          </div>
        </div>

        <div className="chat-footer opacity-50">Seen</div>
      </div>
    </div>
  );
};

export default MessageBox;
