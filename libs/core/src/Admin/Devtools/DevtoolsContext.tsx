import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { LogOut } from "lucide-react";
import { createContext, use, useMemo, type ReactNode } from "react";
import { PalimpClientBackendContext } from "../../PalimpClientBackendContext";
import { PalimpGeneralContext } from "../../PalimpGeneralContext";
import type { User } from "../../types";
import { queryClient } from "../queryClient";
import { Spinner } from "../Spinner";

interface IDevtoolsContext {
  user: User;
  logout: () => Promise<void>;
}

export const DevtoolsContext = createContext<IDevtoolsContext>(null!);

export const useDevtools = () => use(DevtoolsContext);

export const DevtoolsProvider = (props: { children: ReactNode }) => {
  const ctx = use(PalimpGeneralContext);
  const backend = use(PalimpClientBackendContext);

  const user = useQuery(
    {
      queryKey: ["palimp:getUser()"],
      queryFn: () => backend.getUser(),
    },
    queryClient,
  );

  const value = useMemo(
    () =>
      user.data && {
        user: user.data,
        logout: async () => {
          await backend.logout();
          queryClient.invalidateQueries();
          ctx.reset();
          notification.info({
            icon: <LogOut color={"#108ee9"} strokeWidth={1.2} />,
            title: "Signed out successfully",
            placement: "topRight",
          });
        },
      },
    [user.data],
  );

  return value ? (
    <DevtoolsContext value={value}>{props.children}</DevtoolsContext>
  ) : (
    <Spinner />
  );
};
