import * as P from "./UI.parts";

interface UIProps {
  children: JSX.Element;
  justify: "flex-start" | "flex-end" | "center";
}

export default function UI({ children, justify }: UIProps) {
  return <P.UIColumn $justify={justify}>{children}</P.UIColumn>;
}
