import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BackendUrl } from "../constants/Api";
import MessageBox from "./MessageBox";

const Chatpage = () => {
  const params = useParams();
  const targetUserId = params?.targetUserId;
  const user = useSelector((state: RootState) => state?.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState<string>("");
  // @ts-ignore
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BackendUrl + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    // setMessages(chat.data.chat);
    console.log(chat.data.chat);
    const chatMessages = chat?.data?.chat?.messages?.map((msg: any) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      // @ts-ignore
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " " + text);
      // @ts-ignore
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // handle send message
  // @ts-ignore
  const sendMessage = (e) => {
    e.preventDefault()
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      // @ts-ignore
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className=" mx-5   h-[80vh] flex flex-col">
      {/* <h1 className="p-5 border-b border-gray-600"> Chat</h1> */}

      {/* <div className="flex-1  overflow-y-scroll p-5"> */}
      <div className="w-full  flex flex-col     max-h-[90vh] overflow-y-auto">
        {messages?.map((msg: any, index) => {
          return (
            // @ts-ignore
            <MessageBox key={index} user={user} message={msg} />
          );
        })}
      </div>
      {/* <div className="border-gray-600 p-5  border-t flex items-center gap-2"> */}
      <form onSubmit={sendMessage}>
        <div className="flex justify-center gap-2 items-center w-full mt-4">
          <label className="text-xl" htmlFor="message"></label>
          <textarea
            type="text"
            placeholder="Type here"
            className=" textarea textarea-success outline-none border-none"
            value={newMessage}
            // @ts-ignore
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewMessage(e.target.value)
            }
          />
          <button onClick={sendMessage} className="btn btn-primary">
            send
          </button>
        </div>
        </form>
      {/* </div> */}
    </div>
  );
};

export default Chatpage;
