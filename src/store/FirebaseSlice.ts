import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserCredential } from "@firebase/auth";

interface InitialState {
  userID: UserCredential | null;
}

const initialState: InitialState = { userID: null };

const firebase = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    storeUserID(state, actions) {
      state.userID = actions.payload;
    },
  },
});

export default firebase.reducer;

export const selectFirebase = (state: RootState) => state.firebase;
export const { storeUserID } = firebase.actions;
