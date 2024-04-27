import HighScores from "$components/HighScores/HighScores";
import UI from "$components/UI/UI";
import { selectFirebase } from "$store/FirebaseSlice";
import { useAppSelector } from "$hooks/useAppSelector";

export default function RightUI() {
  const { userID } = useAppSelector((state) => selectFirebase(state));

  return <UI justify="center">{userID && <HighScores />}</UI>;
}
