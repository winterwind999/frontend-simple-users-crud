import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<{ userId: number | null }>) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;

export const selectUserId = (state: RootState) => state.user.userId;
