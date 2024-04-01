import { useEffect, useRef } from "react";
import { GlobalStyles } from "$styles/GlobalStyles";
import MainCanvas from "$components/MainCanvas/MainCanvas";
import { calculateScore } from "$utils/score";
import { useAppSelector } from "$utils/typedReduxHooks";
import { selectRowsFilled } from "$store/rowsFilledSlice";
import { useAppDispatch } from "$utils/typedReduxHooks";
import { updateScores } from "$store/highScoresSlice";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

function App() {
  const dispatch = useAppDispatch();

  const { numRowsFilled } = useAppSelector((state) => selectRowsFilled(state));
  const score = calculateScore(numRowsFilled);

  const db = useRef(getFirestore());

  useEffect(() => {
    const scoresRef = doc(db.current, "highScores", "top10");
    const unsub = onSnapshot(scoresRef, (doc) => {
      const unwrapped = doc.data();

      if (!unwrapped) return;

      const scoreValues: number[] = Object.values(unwrapped);
      dispatch(updateScores(scoreValues));
    });

    return () => unsub();
  }, []);

  return (
    <>
      <GlobalStyles />
      <MainCanvas score={score}></MainCanvas>
    </>
  );
}

export default App;
