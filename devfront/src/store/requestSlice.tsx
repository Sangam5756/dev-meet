import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequests: (state,action) => {
      return null;
    },
    deleteRequest: (state, action) => {
      const newArray = state?.filter((r) => r._id !== action.payload);
      return newArray;
    },

  },
});

export const { addRequest, removeRequests, deleteRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
