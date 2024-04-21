import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface InitialState {
  numRowsFilled: number;
  num4rows: number;
}

const initialState: InitialState = { numRowsFilled: 0, num4rows: 0 };

const rowsFilledSlice = createSlice({
  name: "numRowsFilled",
  initialState,
  reducers: {
    incrementRowsFilled(state) {
      state.numRowsFilled++;
    },
    increment4rowsCount(state) {
      state.num4rows++;
    },
    resetRowsFilled(state) {
      state.numRowsFilled = 0;
    },
  },
});

export default rowsFilledSlice.reducer;

export const selectRowsFilled = (state: RootState) => state.numRowsFilled;
export const { incrementRowsFilled, increment4rowsCount, resetRowsFilled } =
  rowsFilledSlice.actions;
