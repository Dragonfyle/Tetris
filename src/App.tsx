import { GlobalStyles } from "$styles/GlobalStyles";
import MainView from "$components/MainView/MainView";
import { calculateScore } from "$utils/score";
import { useAppSelector } from "$hooks/useAppSelector";
import { selectRowsFilled } from "$store/rowsFilledSlice";
import useFirebaseSignIn from "$hooks/useFirebaseSignIn";
import { useEffect, useState } from "react";
import { MOBILE_WIDTH } from "$config/initialSettings";
import MobileScreen from "$components/MobileScreen/MobileScreen";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { numRowsFilled, num4rows } = useAppSelector((state) =>
    selectRowsFilled(state)
  );
  const score = calculateScore(numRowsFilled, num4rows);

  function getWindowSize() {
    setIsMobile(window.innerWidth < MOBILE_WIDTH);
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(getWindowSize);

    resizeObserver.observe(document.body);

    setIsMobile(window.innerWidth < MOBILE_WIDTH);
  }, []);

  useFirebaseSignIn();

  return (
    <>
      <GlobalStyles />
      {!isMobile && <MainView score={score} />}
      {isMobile && <MobileScreen />}
    </>
  );
}

export default App;
