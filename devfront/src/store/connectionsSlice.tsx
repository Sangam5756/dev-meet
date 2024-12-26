import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    addNewConnection: (state, action) => {
      return [...state, action.payload];
    },
    // addNewConnection:(state,action)=> [...state, action.payload]
    removeConnections: (state, action) => {
      return [];
    },
  },
});

export const { addConnections, addNewConnection, removeConnections } =
  connectionsSlice.actions;
export default connectionsSlice.reducer;
