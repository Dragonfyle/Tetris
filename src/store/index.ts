import { configureStore } from "@reduxjs/toolkit";
import runningReducer from "./runningSlice";
import rowsFilledReducer from "./rowsFilledSlice";
import highScoresReducer from "./highScoresSlice";
import blockQueueReducer from "./blockSlice";
import matrixReducer from "./matrixSlice";
import fallIntervalReducer from "./fallIntervalSlice";
import firebaseReducer from "./FirebaseSlice";

const store = configureStore({
  reducer: {
    isRunning: runningReducer,
    numRowsFilled: rowsFilledReducer,
    highScores: highScoresReducer,
    block: blockQueueReducer,
    matrix: matrixReducer,
    fallInterval: fallIntervalReducer,
    firebase: firebaseReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
