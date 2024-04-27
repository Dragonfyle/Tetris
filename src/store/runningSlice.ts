import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface InitialState {
  isRunning: boolean;
}

const initialState: InitialState = { isRunning: false };

const runningSlice = createSlice({
  name: "isRunning",
  initialState,
  reducers: {
    run(state) {
      state.isRunning = true;
    },
    endRun(state) {
      state.isRunning = false;
    },
  },
});

export default runningSlice.reducer;

export const selectIsRunning = (state: RootState) => state.isRunning;
export const { run, endRun } = runningSlice.actions;
