import type { Message, PalimpServerBackendAdapter } from "@palimp/core";
import type { ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";

interface Config {
  projectId: string;
  serviceAccount: ServiceAccount | string;
}

export const createServerAdapter = (
  config: Config,
): PalimpServerBackendAdapter => {
  let db: Firestore = null!;

  const ensureAdmin = async () => {
    if (db) return;

    const { cert, getApps, initializeApp } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");

    const name = "palimp";
    const parsed: ServiceAccount =
      typeof config.serviceAccount === "string"
        ? JSON.parse(config.serviceAccount)
        : config.serviceAccount;
    // firebase-admin's initializeApp throws on duplicate name; reuse if Next
    // dev HMR re-evaluates this module.
    const app =
      getApps().find((a) => a?.name === name) ??
      initializeApp(
        { credential: cert(parsed), projectId: config.projectId },
        name,
      );
    db = getFirestore(app);
  };

  const loadMessages = async (): Promise<Message[]> => {
    await ensureAdmin();
    const snapshot = await db.collection("inline").get();
    return snapshot.docs.map((d) => ({
      key: d.id,
      value: (d.data().value as string | undefined) ?? "",
    }));
  };

  return {
    loadMessages,
  };
};
