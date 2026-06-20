import { use } from "react";
import { PalimpGeneralContext } from "../../PalimpGeneralContext";

export const usePreviewButton = () => {
  const context = use(PalimpGeneralContext);

  return {
    props: {
      onClick: () => context.togglePreview(),
    },
    preview: context.preview,
  };
};
