import { GlobalStyles } from "$styles/GlobalStyles";
import MainCanvas from "$components/MainCanvas/MainCanvas";
import { calculateScore } from "$utils/score";
import { useAppSelector } from "$utils/typedReduxHooks";
import { selectRowsFilled } from "$store/rowsFilledSlice";
import useFirebaseSignIn from "$hooks/useFirebaseSignIn";

function App() {
  const { numRowsFilled } = useAppSelector((state) => selectRowsFilled(state));
  const score = calculateScore(numRowsFilled);

  useFirebaseSignIn();

  return (
    <>
      <GlobalStyles />
      <MainCanvas score={score}></MainCanvas>
    </>
  );
}

export default App;
