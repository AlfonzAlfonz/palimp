import { createContext } from "react";
import type { PalimpPublishAdapter } from "./PalimpPublishAdapter";

export const PalimpPublishContext = createContext<PalimpPublishAdapter>(null!);
