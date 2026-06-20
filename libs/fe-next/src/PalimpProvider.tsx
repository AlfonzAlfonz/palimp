"use client";

import { PalimpClientBackendContext, PalimpGeneralContext } from "@palimp/core";
import dynamic from "next/dynamic";
import { use, useEffect, useState, type ReactNode } from "react";

const Devtools = dynamic(() =>
  import("@palimp/core/admin").then((m) => m.Devtools),
);

interface Props {
  admin?: boolean;
  children: ReactNode;
}

export const PalimpProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState(false);
  const [preview, setPreview] = useState(false);

  const backend = use(PalimpClientBackendContext);

  useEffect(() => {
    setAdmin(backend.hasSession());
  }, []);

  return (
    <PalimpGeneralContext
      value={{ admin, preview, togglePreview: () => setPreview((s) => !s) }}
    >
      {children}
      {admin ? <Devtools /> : null}
    </PalimpGeneralContext>
  );
};
