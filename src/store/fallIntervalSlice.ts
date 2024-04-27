import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { INITIAL_INTERVAL } from "$config/initialSettings";

interface InitialState {
  fallInterval: number;
}

const initialState: InitialState = { fallInterval: INITIAL_INTERVAL };

const fallInterval = createSlice({
  name: "fallInterval",
  initialState,
  reducers: {
    updateFallInterval(state, action) {
      state.fallInterval = action.payload;
    },
    resetFallInterval(state) {
      state.fallInterval = INITIAL_INTERVAL;
    },
  },
});

export default fallInterval.reducer;

export const selectFallInterval = (state: RootState) => state.fallInterval;
export const { updateFallInterval, resetFallInterval } = fallInterval.actions;
