import { useMutation } from "@tanstack/react-query";
import { use } from "react";
import { PalimpPublishContext } from "../../PalimpPublishContext";
import { queryClient } from "../queryClient";

export const usePublishButton = () => {
  const adapter = use(PalimpPublishContext);

  const mutation = useMutation(
    {
      mutationKey: ["palimp:publish"],
      mutationFn: async () => {
        if (!adapter) return;
        await adapter.publish();
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
  };
};
