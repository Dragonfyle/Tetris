import * as P from "./UI.parts";

interface UIProps {
  justify: "flex-start" | "flex-end" | "center";
}

export default function UI({ justify }: UIProps) {
  return (
    <P.Wrapper $justify={justify}>
      <P.StatsColumn />
    </P.Wrapper>
  );
}
