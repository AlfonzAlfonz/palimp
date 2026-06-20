import { Button } from "antd";
import { useSaveButton } from "./useSaveButton";
import { usePreviewButton } from "./usePreviewButton";
import { usePublishButton } from "./usePublishButton";

export const DevtoolsContent = () => {
  const save = useSaveButton();
  const preview = usePreviewButton();
  const publish = usePublishButton();

  return (
    <>
      <Button {...save.props} block>
        {save.isPending ? "Saving..." : `Save (${save.length})`}
      </Button>

      <Button {...preview.props} block>
        {preview.preview ? "Edit mode" : "Preview mode"}
      </Button>

      <div style={{ flex: "1 1 0" }} />

      <Button {...publish.props} block disabled={!publish.hasToken}>
        {!publish.hasToken
          ? "Missing publish token"
          : publish.isPending
            ? "Publishing..."
            : "Publish"}
      </Button>
    </>
  );
};
