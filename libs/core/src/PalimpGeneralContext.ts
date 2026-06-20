import { createContext } from "react";

export interface IPalimpGeneralContext {
  admin: boolean | undefined;

  preview: boolean;
  togglePreview: () => void;

  reset: () => void;
}

export const PalimpGeneralContext = createContext<IPalimpGeneralContext>(null!);
