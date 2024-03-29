import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

export type { ButtonProps };
