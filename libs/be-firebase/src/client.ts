import type { PalimpClientBackendAdapter } from "@palimp/core";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

const SESSION_FLAG_KEY = "palimp:firebase:hasSession";

export const createClientAdapter = (
  config: FirebaseOptions,
): PalimpClientBackendAdapter => {
  let app: FirebaseApp = null!;
  let auth: Auth = null!;
  let db: Firestore = null!;

  const ensureFirebase = async () => {
    if (app) return;

    const appModule = await import("firebase/app");
    const authModule = await import("firebase/auth");
    const firestoreModule = await import("firebase/firestore");

    const name = config.projectId ?? "palimp";
    const existing = appModule.getApps().find((a) => a.name === name);
    app = existing ?? appModule.initializeApp(config, name);
    auth = authModule.getAuth(app);
    db = firestoreModule.getFirestore(app);
  };

  const setSessionFlag = (value: boolean) => {
    if (typeof localStorage === "undefined") return;
    if (value) {
      localStorage.setItem(SESSION_FLAG_KEY, "1");
    } else {
      localStorage.removeItem(SESSION_FLAG_KEY);
    }
  };

  return {
    login: async (value) => {
      await ensureFirebase();

      if (value.type === "email-password") {
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        await signInWithEmailAndPassword(auth, value.email, value.password);
        setSessionFlag(true);
        return;
      }
      // value satisfies never;
    },
    logout: async () => {
      await ensureFirebase();
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      setSessionFlag(false);
    },
    hasSession: () => {
      if (typeof localStorage === "undefined") return false;
      return localStorage.getItem(SESSION_FLAG_KEY) === "1";
    },

    getUser: async () => {
      await ensureFirebase();
      const { doc, getDoc } = await import("firebase/firestore");

      await auth.authStateReady();
      const user = auth.currentUser;
      if (!user) {
        setSessionFlag(false);
        throw new Error("Not authenticated");
      }

      const snap = await getDoc(doc(db, "profiles", user.uid));
      const data = snap.exists() ? snap.data() : undefined;
      setSessionFlag(true);

      return {
        id: user.uid,
        email: user.email ?? "",
        name: (data?.name as string | null) ?? undefined,
        publishToken: (data?.publishToken as string | null) ?? undefined,
      };
    },

    getKey: async (key) => {
      await ensureFirebase();
      const { doc, getDoc } = await import("firebase/firestore");

      const snap = await getDoc(doc(db, "inline", key));
      if (!snap.exists()) return null;
      const value = snap.data().value;
      return typeof value === "string" ? value : null;
    },
    setKeys: async (entries) => {
      await ensureFirebase();

      if (entries.length === 0) return;

      const { doc, writeBatch } = await import("firebase/firestore");
      const batch = writeBatch(db);
      for (const [key, value] of entries) {
        batch.set(doc(db, "inline", key), { value }, { merge: true });
      }
      await batch.commit();
    },
  };
};
