import { updateScores } from "$store/highScoresSlice";
import { readScoresFromFirebase } from "$utils/firebaseReadWrite";
import { useAppDispatch } from "$utils/typedReduxHooks";
import {
  DocumentReference,
  doc,
  getFirestore,
  onSnapshot,
} from "@firebase/firestore";
import { useEffect, useRef } from "react";

export default function useLiveHighScores() {
  const dispatch = useAppDispatch();
  const db = useRef(getFirestore());
  const scoresRef = useRef(doc(db.current, "highScores", "top10"));

  async function getScores(scoresRef: DocumentReference) {
    const scores = await readScoresFromFirebase(scoresRef);
    const values = Object.values(scores);

    dispatch(updateScores(values));
  }

  function keepScoresUpToDate(scoresRef: DocumentReference) {
    const unsub = onSnapshot(scoresRef, (doc) => {
      const unwrapped = doc.data();

      if (!unwrapped) return;

      const scoreValues: number[] = Object.values(unwrapped);
      dispatch(updateScores(scoreValues));
    });

    return unsub;
  }

  useEffect(() => {
    getScores(scoresRef.current);
    const unsub = keepScoresUpToDate(scoresRef.current);

    return () => unsub();
  }, []);
}
