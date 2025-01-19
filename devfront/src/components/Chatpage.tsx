import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BackendUrl } from "../constants/Api";

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
  const sendMessage = () => {
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
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600"> Chat</h1>

      <div className="flex-1  overflow-y-scroll p-5">
        {messages?.map((msg: any, index) => {
          return (
            <div
              key={index}
              // @ts-ignore
              className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                {msg?.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>

              <div className="chat-bubble">{msg?.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="border-gray-600 p-5  border-t flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
          className="flex-1 border-gray-600 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          send
        </button>
      </div>
    </div>
  );
};

export default Chatpage;
