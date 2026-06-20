import type { User } from "./types";

export interface PalimpClientBackendAdapter {
  login: (value: LoginValue) => Promise<void>;
  hasSession: () => boolean;
  getUser: () => Promise<User>;

  getKey: (key: string) => Promise<string | null>;
  // setKey: (key: string, value: string) => Promise<void>;
  setKeys: (entries: ReadonlyArray<readonly [string, string]>) => Promise<void>;
}

type LoginValue = { type: "email-password"; email: string; password: string };
