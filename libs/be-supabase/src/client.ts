import { type createBrowserClient } from "@supabase/ssr";
import type { PalimpClientBackendAdapter } from "@palimp/core";

export const createClientAdapter = (
  url: string,
  key: string,
): PalimpClientBackendAdapter => {
  let supabase: ReturnType<typeof createBrowserClient> = null!;

  const ensureSupabase = async () => {
    const m = await import("@supabase/ssr");

    supabase = m.createBrowserClient(url, key);
  };

  return {
    login: async (value) => {
      await ensureSupabase();

      if (value.type === "email-password") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        });

        if (signInError) {
          throw signInError;
        }

        return;
      }
      // value satisfies never;
    },
    hasSession: () => hasAuthCookie(url),

    getKey: async (key) => {
      await ensureSupabase();

      const result = await supabase
        .from("inline")
        .select("value")
        .eq("key", key)
        .maybeSingle();

      return result.data?.value ?? null;
    },
    setKeys: async (entries) => {
      await ensureSupabase();

      if (entries.length === 0) return;

      const rows = entries.map(([key, value]) => ({ key, value }));
      const { error } = await supabase
        .from("inline")
        .upsert(rows, { onConflict: "key" });

      if (error) {
        throw error;
      }
    },
  };
};

function hasAuthCookie(url: string): boolean {
  if (typeof document === "undefined") return false;

  if (!url) return false;
  const ref = url.match(/^https?:\/\/([^.]+)\./)?.[1];
  if (!ref) return false;
  const prefix = `sb-${ref}-auth-token`;
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${prefix}=`) || c.startsWith(`${prefix}.`));
}
