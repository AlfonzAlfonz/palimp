"use client";
import { useMemo, type ReactNode } from "react";
import { PalimpPublishContext } from "@palimp/core";
import { createGithubPublishAdapter, type GithubPublishOptions } from "./client";

interface Props extends GithubPublishOptions {
  children: ReactNode;
}

export const PalimpGithubPublishProvider = ({
  children,
  ...opts
}: Props) => {
  const adapter = useMemo(
    () => createGithubPublishAdapter(opts),
    [opts.token, opts.owner, opts.repo, opts.workflow, opts.ref, opts.inputs],
  );

  return (
    <PalimpPublishContext value={adapter}>{children}</PalimpPublishContext>
  );
};
