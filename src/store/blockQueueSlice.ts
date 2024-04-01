import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  RenderableBlockDefinition,
  RotationIdx,
  Vector,
} from "$types/typeCollection";
import getRenderableBlock from "$utils/getRandomBlock";
import {
  INITIAL_ROTATION_IDX,
  getNextRotation,
  renderableBlockList,
} from "$utils/block/block";
import { SPAWN_LOCATION } from "$config/initialSettings";

interface InitialState {
  currentBlock: {
    definition: RenderableBlockDefinition;
    hookLocation: Vector;
    activeRotationIdx: RotationIdx;
  };
  nextBlock: { definition: RenderableBlockDefinition };
}

const initialBlock = getRenderableBlock(renderableBlockList);

const initialState: InitialState = {
  currentBlock: {
    definition: initialBlock,
    hookLocation: SPAWN_LOCATION,
    activeRotationIdx: INITIAL_ROTATION_IDX,
  },
  nextBlock: { definition: initialBlock },
};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    getNextBlock(state) {
      state.currentBlock.definition = state.nextBlock.definition;
      state.nextBlock.definition = getRenderableBlock(renderableBlockList);
    },
    updateHookLocation(state, action) {
      state.currentBlock.hookLocation = action.payload;
    },
    resetHookLocation(state) {
      state.currentBlock.hookLocation = SPAWN_LOCATION;
    },
    setNextRotation(state) {
      state.currentBlock.activeRotationIdx = getNextRotation(
        state.currentBlock.activeRotationIdx
      );
    },
    resetRotation(state) {
      state.currentBlock.activeRotationIdx = INITIAL_ROTATION_IDX;
    },
  },
});

export default blockSlice.reducer;

export const selectBlock = (state: RootState) => state.block;
export const {
  getNextBlock,
  updateHookLocation,
  resetHookLocation,
  resetRotation,
  setNextRotation,
} = blockSlice.actions;
