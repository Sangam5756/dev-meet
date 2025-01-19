import { io } from "socket.io-client";
import { BackendUrl } from "../constants/Api";

export const createSocketConnection = () => {
  return io(BackendUrl);
};
