import { createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/types";

type FeedState = User[]
const initialState:FeedState=[]
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (_state, action) => action.payload,
    removeFeed: () => {
      return [];
    },
    removeUserFeed: (state, action) => {
      const newArray = state?.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeed, removeFeed ,removeUserFeed} = feedSlice.actions;
export default feedSlice.reducer;
