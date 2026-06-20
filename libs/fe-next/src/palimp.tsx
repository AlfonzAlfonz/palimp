import type { PalimpServerBackendAdapter } from "@palimp/core";
import { XcoreClientComponent } from "./ClientComponent.tsx";

let backend: PalimpServerBackendAdapter;

export const setBackendAdapter = (be: PalimpServerBackendAdapter) => {
  backend = be;
};

export const palimp = async () => {
  const messages = await backend.loadMessages();

  return {
    p: (key: string, options?: { defaultMessage: string }) => (
      <XcoreClientComponent
        messageKey={key}
        staleValue={
          messages.find((m) => m.key === key)?.value ??
          options?.defaultMessage ??
          key
        }
      />
    ),
  };
};
