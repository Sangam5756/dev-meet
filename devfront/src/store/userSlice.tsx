import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";

type UserState = User | null;
const initialState: UserState = null ;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // @ts-ignore
    addUser: (_state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
