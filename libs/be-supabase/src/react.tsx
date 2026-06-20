"use client";
import { createClientAdapter } from "./client";
import { useMemo, type ReactNode } from "react";
import { PalimpClientBackendContext } from "@palimp/core";

interface Props {
  url: string;
  publishableKey: string;

  children: ReactNode;
}

export const PalimpSupabaseProvider = ({
  url,
  publishableKey,
  children,
}: Props) => {
  const client = useMemo(() => createClientAdapter(url, publishableKey), []);

  return (
    <PalimpClientBackendContext value={client}>
      {children}
    </PalimpClientBackendContext>
  );
};
