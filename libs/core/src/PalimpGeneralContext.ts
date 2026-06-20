import { createContext } from "react";

export interface IPalimpGeneralContext {
  admin: boolean;

  preview: boolean;
  togglePreview: () => void;
}

export const PalimpGeneralContext = createContext<IPalimpGeneralContext>(null!);
