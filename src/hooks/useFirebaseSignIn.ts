import { storeUserID } from "$store/FirebaseSlice";
import { useAppDispatch } from "./useAppDispatch";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "@firebase/auth";
import { useEffect, useRef } from "react";

export default function useFirebaseSignIn() {
  const dispatch = useAppDispatch();
  const auth = useRef(getAuth());

  async function signIn(auth: Auth) {
    signInAnonymously(auth).catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      console.error(`error ${errCode}, ${errMessage}`);
    });
  }

  useEffect(() => {
    signIn(auth.current);
    const unsub = onAuthStateChanged(auth.current, (user) => {
      if (user) {
        dispatch(storeUserID(user?.uid));
      } else {
        dispatch(storeUserID(null));
      }
    });

    return () => unsub();
  }, []);
}
