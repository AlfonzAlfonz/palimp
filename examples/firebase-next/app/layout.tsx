import { PalimpFirebaseProvider } from "@palimp/be-firebase/react";
import { createServerAdapter } from "@palimp/be-firebase/server";
import { PalimpProvider, setBackendAdapter } from "@palimp/fe-next";
import { PalimpGithubPublishProvider } from "@palimp/publish-github/react";
import { type ReactNode } from "react";

setBackendAdapter(
  createServerAdapter({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT!,
  }),
);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <PalimpFirebaseProvider config={firebaseConfig}>
      <PalimpGithubPublishProvider
        owner={process.env.NEXT_PUBLIC_GITHUB_OWNER!}
        repo={process.env.NEXT_PUBLIC_GITHUB_REPO!}
        workflow={process.env.NEXT_PUBLIC_GITHUB_WORKFLOW!}
      >
        <PalimpProvider>
          <html lang="en">
            <body>{children}</body>
          </html>
        </PalimpProvider>
      </PalimpGithubPublishProvider>
    </PalimpFirebaseProvider>
  );
}
