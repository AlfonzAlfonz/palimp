import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { createContext, use, useMemo, type ReactNode } from "react";
import { PalimpClientBackendContext } from "../../PalimpClientBackendContext";
import type { User } from "../../types";
import { queryClient } from "../queryClient";

interface IDevtoolsContext {
  user: User;
}

export const DevtoolsContext = createContext<IDevtoolsContext>(null!);

export const useDevtools = () => use(DevtoolsContext);

export const DevtoolsProvider = (props: { children: ReactNode }) => {
  const backend = use(PalimpClientBackendContext);

  const user = useQuery(
    {
      queryKey: ["palimp:getUser()"],
      queryFn: () => backend.getUser(),
    },
    queryClient,
  );

  const value = useMemo(() => user.data && { user: user.data }, [user.data]);

  return value ? (
    <DevtoolsContext value={value}>{props.children}</DevtoolsContext>
  ) : (
    <div
      style={{
        flex: "1 1 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};
