import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface InitialState {
  highScores: number[];
}

const initialState: InitialState = { highScores: [] };

const highScoresSlice = createSlice({
  name: "highScores",
  initialState,
  reducers: {
    updateScores(state, action) {
      state.highScores = action.payload;
    },
  },
});

export default highScoresSlice.reducer;

export const selectHighScores = (state: RootState) => state.highScores;
export const { updateScores } = highScoresSlice.actions;
