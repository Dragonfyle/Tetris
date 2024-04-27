import * as P from "./Controls.parts";

export default function Controls() {
  return (
    <P.GridContainer>
      <P.Spacebar />
      <P.UpArrow />
      <P.LeftArrow />
      <P.DownArrow />
      <P.RightArrow />
    </P.GridContainer>
  );
}
