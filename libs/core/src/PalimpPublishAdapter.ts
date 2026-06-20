export interface PalimpPublishAdapter {
  publish: (token: string) => Promise<PalimpPublishRun>;
  getLatestRun: (token: string) => Promise<PalimpPublishRun | null>;
}

export interface PalimpPublishRun {
  id: string;
  dispatchedAt: number;
  url?: string;
  status: PublishRunStatus;
  conclusion?: PublishRunConclusion;
}

export type PublishRunStatus = "queued" | "in_progress" | "completed";

export type PublishRunConclusion =
  | "success"
  | "failure"
  | "cancelled"
  | "timed_out"
  | "skipped"
  | "unknown";
