"use client";

import { PalimpClientBackendContext, PalimpGeneralContext } from "@palimp/core";
import dynamic from "next/dynamic";
import { use, useEffect, useState, type ReactNode } from "react";

const Devtools = dynamic(() =>
  import("@palimp/core/admin").then((m) => m.Devtools),
);

interface Props {
  children: ReactNode;
}

export const PalimpProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const [preview, setPreview] = useState(false);

  const backend = use(PalimpClientBackendContext);

  useEffect(() => {
    if (admin === undefined) {
      setAdmin(backend.hasSession());
    }
  }, [admin]);

  return (
    <PalimpGeneralContext
      value={{
        admin: admin,
        preview,
        togglePreview: () => setPreview((s) => !s),

        reset: () => {
          setAdmin(undefined);
          setPreview(false);
        },
      }}
    >
      {children}
      {admin ? <Devtools /> : null}
    </PalimpGeneralContext>
  );
};
