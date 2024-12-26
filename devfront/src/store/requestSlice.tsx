import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequests: (state,action) => {
      return [];
    },
    deleteRequest: (state, action) => {
      // Return a new array without the request that matches the provided _id
      const newArray =state.filter((r) => r._id !== action.payload);
      console.log(newArray)
      return newArray;
    },

  },
});

export const { addRequest, removeRequests, deleteRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
