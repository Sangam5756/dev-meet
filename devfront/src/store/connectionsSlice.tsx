import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    addNewConnection:(state,action)=> [...state, action.payload]
    ,
    removeConnections: (state,action) => {
      return null;
    },
  },
});

export const { addConnections,addNewConnection, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
