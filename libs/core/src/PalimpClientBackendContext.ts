import { createContext } from "react";
import type { PalimpClientBackendAdapter } from "./PalimpClientBackendAdapter";

export const PalimpClientBackendContext =
  createContext<PalimpClientBackendAdapter>(null!);
