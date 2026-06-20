import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { PalimpPublishContext } from "../../PalimpPublishContext";
import { queryClient } from "../queryClient";
import { useDevtools } from "./DevtoolsContext";

export const publishRunQueryKey = ["palimp:publish:latestRun"] as const;

export const usePublishRun = () => {
  const adapter = use(PalimpPublishContext);
  const { user } = useDevtools();
  const token = user.publishToken;

  return useQuery(
    {
      queryKey: publishRunQueryKey,
      queryFn: () => adapter!.getLatestRun(token!),
      enabled: !!adapter && !!token,
      refetchInterval: (q) =>
        q.state.data && q.state.data.status !== "completed" ? 10_000 : false,
    },
    queryClient,
  );
};
