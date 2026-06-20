import { PalimpSupabaseProvider } from "@palimp/be-supabase/react";
import { createServerAdapter } from "@palimp/be-supabase/server";
import { PalimpProvider, setBackendAdapter } from "@palimp/fe-next";
import { type ReactNode } from "react";

setBackendAdapter(
  createServerAdapter(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  ),
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <PalimpSupabaseProvider
      url={process.env.NEXT_PUBLIC_SUPABASE_URL!}
      publishableKey={process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!}
    >
      <PalimpProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </PalimpProvider>
    </PalimpSupabaseProvider>
  );
}
