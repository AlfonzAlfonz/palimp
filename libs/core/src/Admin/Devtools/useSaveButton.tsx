import { useMutation } from "@tanstack/react-query";
import { use } from "react";
import { PalimpClientBackendContext } from "../../PalimpClientBackendContext";
import { editQueryKey, editsStore, usePendingEdits } from "../editsStore";
import { queryClient } from "../queryClient";

export const useSaveButton = () => {
  const backend = use(PalimpClientBackendContext);

  const mutation = useMutation(
    {
      mutationKey: ["palimp:save"],
      mutationFn: async () => {
        const entries = editsStore.entries();
        if (entries.length === 0) return;

        await backend.setKeys(entries);
        editsStore.clear();
        for (const [key] of entries) {
          queryClient.invalidateQueries({ queryKey: editQueryKey(key) });
        }
      },
    },
    queryClient,
  );

  const pending = usePendingEdits();

  return {
    props: {
      disabled: pending.length === 0 || mutation.isPending,
      onClick: () => mutation.mutate(),
    },
    isPending: mutation.isPending,
    length: pending.length,
  };
};
