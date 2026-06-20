"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { editQueryKey, editsStore, useEdit } from "./editsStore.ts";
import { PalimpClientBackendContext } from "../PalimpClientBackendContext.ts";
import { queryClient } from "./queryClient.ts";
import { PalimpGeneralContext } from "../PalimpGeneralContext.ts";

export const EditComponent = ({
  messageKey,
  staleValue,
  textarea,
}: {
  messageKey: string;
  staleValue: string;
  textarea?: boolean;
}) => {
  const ctx = use(PalimpGeneralContext);
  const backend = use(PalimpClientBackendContext);

  const { data, isLoading } = useQuery(
    {
      queryKey: editQueryKey(messageKey),
      queryFn: () => backend.getKey(messageKey),
    },
    queryClient,
  );
  const pending = useEdit(messageKey);
  const value = pending ?? data ?? staleValue ?? "";

  if (ctx.preview) {
    return <>{value}</>;
  }

  if (textarea) {
    return (
      <textarea
        value={isLoading ? "" : value}
        placeholder={isLoading ? staleValue : messageKey}
        style={style}
        onChange={(e) => editsStore.set(messageKey, e.target.value)}
        disabled={isLoading}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    );
  }

  return (
    <input
      value={isLoading ? "" : value}
      placeholder={isLoading ? "Loading..." : messageKey}
      style={style}
      onChange={(e) => editsStore.set(messageKey, e.target.value)}
      disabled={isLoading}
    />
  );
};

const style: React.CSSProperties = {
  boxSizing: "border-box",

  border: "none",
  outline: "1px dashed currentcolor",
  fieldSizing: "content",
  background: "transparent",
  margin: "0",
  padding: "0",
  overflow: "hidden",

  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  color: "inherit",
  textAlign: "inherit",
  resize: "none",
  lineHeight: "inherit",
  letterSpacing: "inherit",
  textTransform: "inherit",
};
