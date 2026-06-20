"use client";

import { PalimpGeneralContext } from "@palimp/core";
import dynamic from "next/dynamic";
import { use } from "react";

const Edit = dynamic(
  () => import("@palimp/core/admin").then((m) => m.EditComponent),
  {
    loading: () => <span>...</span>,
  },
);

export const XcoreClientComponent = ({
  messageKey,
  staleValue,
}: {
  messageKey: string;
  staleValue: string;
}) => {
  const context = use(PalimpGeneralContext);

  if (context.admin) {
    return <Edit messageKey={messageKey} staleValue={staleValue} textarea />;
  }

  return <>{staleValue}</>;
};
