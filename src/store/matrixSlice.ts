import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ColorCodeMatrix } from "$types/globalTypes";
import { createMatrix } from "$utils/matrix";
import { BOARD_DIMENSIONS } from "$config/board";

interface InitialState {
  staticMatrix: ColorCodeMatrix;
}

const initialMatrix = createMatrix(
  BOARD_DIMENSIONS.WIDTH,
  BOARD_DIMENSIONS.HEIGHT
);

const initialState: InitialState = {
  staticMatrix: initialMatrix,
};

const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    updateMatrix(state, action) {
      state.staticMatrix = action.payload;
    },
    clearMatrix(state) {
      state.staticMatrix = initialMatrix;
    },
  },
});

export default matrixSlice.reducer;

export const selectMatrix = (state: RootState) => state.matrix;
export const { updateMatrix, clearMatrix } = matrixSlice.actions;
