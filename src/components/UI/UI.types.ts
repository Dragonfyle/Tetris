import { PropsWithChildren } from "react";

interface UIProps extends PropsWithChildren {
  justify: "flex-start" | "flex-end" | "center";
}

export type { UIProps };
