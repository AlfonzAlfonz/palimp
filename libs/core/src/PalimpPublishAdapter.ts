export interface PalimpPublishAdapter {
  publish: (token: string) => Promise<void>;
}
