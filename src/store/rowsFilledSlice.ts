import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface InitialState {
  numRowsFilled: number;
}

const initialState: InitialState = { numRowsFilled: 0 };

const rowsFilledSlice = createSlice({
  name: "numRowsFilled",
  initialState,
  reducers: {
    incrementRowsFilled(state) {
      state.numRowsFilled++;
    },
    resetRowsFilled(state) {
      state.numRowsFilled = 0;
    },
  },
});

export default rowsFilledSlice.reducer;

export const selectRowsFilled = (state: RootState) => state.numRowsFilled;
export const { incrementRowsFilled, resetRowsFilled } = rowsFilledSlice.actions;
