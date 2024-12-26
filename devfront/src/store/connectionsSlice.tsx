import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionRequest} from "../utils/types";

type connectionState = ConnectionRequest[]

const initialState:connectionState=[]



const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (_state,action:PayloadAction<connectionState>) => action.payload,

    addNewConnection: (state, action:PayloadAction<ConnectionRequest>) => {
      return [...state, action.payload];
    },
    // addNewConnection:(state,action)=> [...state, action.payload]
    removeConnections: () => {
      return [];
    },
  },
});

export const { addConnections, addNewConnection, removeConnections } =
  connectionsSlice.actions;
export default connectionsSlice.reducer;
