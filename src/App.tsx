import { useEffect, useRef, useSyncExternalStore } from "react";
import { GlobalStyles } from "$styles/GlobalStyles";
import MainCanvas from "$components/MainCanvas/MainCanvas";
import { calculateScore } from "$utils/score";
import { useAppSelector } from "$utils/typedReduxHooks";
import { selectRowsFilled } from "$store/rowsFilledSlice";
import { useAppDispatch } from "$utils/typedReduxHooks";
import { selectHighScores, updateScores } from "$store/highScoresSlice";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, signInAnonymously, Auth } from "firebase/auth";

function App() {
  const { highScores } = useAppSelector((state) => selectHighScores(state));
  const dispatch = useAppDispatch();

  const { numRowsFilled } = useAppSelector((state) => selectRowsFilled(state));
  const score = calculateScore(numRowsFilled);

  const db = useRef(getFirestore());
  const auth = useRef(getAuth());

  useEffect(() => {
    signIn(auth.current);
  });

  useSyncExternalStore(keepScoresUpToDate, getSnapshot);

  function keepScoresUpToDate() {
    const scoresRef = doc(db.current, "highScores", "top10");
    const unsub = onSnapshot(scoresRef, (doc) => {
      const unwrapped = doc.data();

      if (!unwrapped) return;

      const scoreValues: number[] = Object.values(unwrapped);
      dispatch(updateScores(scoreValues));
    });

    return unsub;
  }

  async function signIn(auth: Auth) {
    signInAnonymously(auth).catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      console.error(`error ${errCode}, ${errMessage}`);
    });
  }

  function getSnapshot() {
    return highScores;
  }

  return (
    <>
      <GlobalStyles />
      <MainCanvas score={score}></MainCanvas>
    </>
  );
}

export default App;
