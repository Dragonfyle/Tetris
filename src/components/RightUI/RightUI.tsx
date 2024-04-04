import HighScores from "$components/HighScores/HighScores";
import UI from "$components/UI/UI";
import { selectFirebase } from "$store/FirebaseSlice";
import { useAppSelector } from "$utils/typedReduxHooks";

export default function RightUI() {
  const { userID } = useAppSelector((state) => selectFirebase(state));

  return <UI justify="center">{userID && <HighScores />}</UI>;
}
