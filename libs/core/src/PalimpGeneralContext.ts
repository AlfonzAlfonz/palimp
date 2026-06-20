import { createContext } from "react";

export interface PalimpGeneralContextValue {
  admin: boolean;

  preview: boolean;
  togglePreview: () => void;
}

export const PalimpGeneralContext = createContext<PalimpGeneralContextValue>(
  null!,
);
