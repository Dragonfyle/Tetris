import { firebaseConfig } from "$config/firebase";
import { DB_NUM_HIGH_SCORES } from "$config/initialSettings";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";

initializeApp(firebaseConfig);
const db = getFirestore();
const highScoresRef = doc(db, "highScores", "top10");

export async function writeScoreToFirebase(score: number) {
  const currentHighScores = await readScoresFromFirebase();

  if (!isHigh(score, currentHighScores)) return;

  const newRanking = getNewRanking(score, currentHighScores);
  setDoc(highScoresRef, newRanking, { merge: true });
}

export async function readScoresFromFirebase() {
  const docSnap = await getDoc(highScoresRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("could not get high scores");
  }
}

function getNewRanking(score: number, highScores: DocumentData) {
  if (!Object.keys(highScores).length) {
    return { 0: score };
  }

  const currentHighScores = Object.values(highScores);
  if (currentHighScores.length >= DB_NUM_HIGH_SCORES) {
    currentHighScores.pop();
  }

  currentHighScores.push(score);
  const sorted = currentHighScores.sort((a, b) => b - a);

  return Object.fromEntries(sorted.map((score, idx) => [idx, score]));
}

function isHigh(score: number, highScores: DocumentData) {
  const currentHighScores = Object.values(highScores);

  return (
    currentHighScores.length < DB_NUM_HIGH_SCORES ||
    score > currentHighScores[currentHighScores.length - 1]
  );
}
