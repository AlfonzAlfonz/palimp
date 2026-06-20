import { useMutation } from "@tanstack/react-query";
import { use } from "react";
import { PalimpPublishContext } from "../../PalimpPublishContext";
import { queryClient } from "../queryClient";
import { useDevtools } from "./DevtoolsContext";

export const usePublishButton = () => {
  const { user } = useDevtools();

  const adapter = use(PalimpPublishContext);

  const mutation = useMutation(
    {
      mutationKey: ["palimp:publish"],
      mutationFn: async () => {
        if (!adapter || !user.publishToken) return;
        await adapter.publish(user.publishToken);
      },
    },
    queryClient,
  );

  if (!adapter) {
    return {
      props: { disabled: true, onClick: () => {} },
      isPending: false,
      available: false,
    };
  }

  return {
    props: {
      disabled: mutation.isPending,
      onClick: () => mutation.mutate(),
    },
    isPending: mutation.isPending,
    available: true,
    hasToken: !!user.publishToken,
  };
};
