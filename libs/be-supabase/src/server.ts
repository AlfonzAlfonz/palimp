import type { Message, PalimpServerBackendAdapter } from "@palimp/core";

export const createServerAdapter = (
  url: string,
  secretKey: string,
): PalimpServerBackendAdapter => {
  const loadMessages = async (): Promise<Message[]> => {
    const res = await fetch(`${url}/rest/v1/inline?select=key,value`, {
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Unlucky: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  return {
    loadMessages,
  };
};
