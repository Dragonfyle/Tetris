import * as P from "./Button.parts";
import { ButtonProps } from "./Button.types";

export default function Button({ children, onClick }: ButtonProps) {
  return <P.StyledButton onClick={onClick}>{children}</P.StyledButton>;
}
