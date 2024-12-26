import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";

type ConnectionState = User[];

const initialState:ConnectionState =[];




const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequest: (_state, action:PayloadAction<ConnectionState>) => action.payload,
    removeRequests: () => {
      return [];
    },
    deleteRequest: (state, action:PayloadAction<string>) => {
      // Return a new array without the request that matches the provided _id
      const newArray =state.filter((r) => r._id !== action.payload);
      
      return newArray;
    },

  },
});

export const { addRequest, removeRequests, deleteRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
