"use client";
import { LoginPageCore } from "@palimp/core/admin";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const router = useRouter();
  return (
    <LoginPageCore
      onLogin={() => {
        router.push("/");
        router.refresh();
      }}
    />
  );
};
