import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      return null;
    },
    removeUserFeed: (state, action) => {
      const newArray = state?.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeed, removeFeed ,removeUserFeed} = feedSlice.actions;
export default feedSlice.reducer;
