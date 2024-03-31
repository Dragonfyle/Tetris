import { UIProps } from "./UI.types";
import * as P from "./UI.parts";

export default function UI({ children, justify }: UIProps) {
  return <P.UIColumn $justify={justify}>{children}</P.UIColumn>;
}
