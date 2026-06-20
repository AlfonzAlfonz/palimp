export interface Message {
  key: string;
  value: string;
}

export interface PalimpServerBackendAdapter {
  loadMessages: () => Promise<Message[]>;
}
