export interface Message {
  key: string;
  value: string;
}

export interface PalimpServerBackendAdapter {
  loadMessages: () => Promise<Message[]>;
}

export interface User {
  id: string;

  email: string;
  name: string | undefined;

  publishToken: string | undefined;
}
