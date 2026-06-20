"use client";
import { createClientAdapter } from "./client";
import { useMemo, type ReactNode } from "react";
import { PalimpClientBackendContext } from "@palimp/core";
import type { FirebaseOptions } from "firebase/app";

interface Props {
  config: FirebaseOptions;

  children: ReactNode;
}

export const PalimpFirebaseProvider = ({ config, children }: Props) => {
  const client = useMemo(() => createClientAdapter(config), []);

  return (
    <PalimpClientBackendContext value={client}>
      {children}
    </PalimpClientBackendContext>
  );
};
