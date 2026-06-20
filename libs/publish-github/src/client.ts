import type { PalimpPublishAdapter } from "@palimp/core";

export interface GithubPublishOptions {
  owner: string;
  repo: string;
  workflow: string;
  ref?: string;
  inputs?: Record<string, string>;
}

export const createGithubPublishAdapter = (
  opts: GithubPublishOptions,
): PalimpPublishAdapter => ({
  publish: async (token: string) => {
    const res = await fetch(
      `https://api.github.com/repos/${opts.owner}/${opts.repo}/actions/workflows/${opts.workflow}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          ref: opts.ref ?? "main",
          ...(opts.inputs ? { inputs: opts.inputs } : {}),
        }),
      },
    );
    if (!res.ok) {
      throw new Error(
        `GitHub dispatch failed: ${res.status} ${res.statusText}`,
      );
    }
  },
});
