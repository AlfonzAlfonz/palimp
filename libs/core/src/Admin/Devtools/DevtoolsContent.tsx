import { Button, Space } from "antd";
import { useState } from "react";
import { PublishStatusIcon } from "./PublishStatusIcon";
import { PublishStatusModal } from "./PublishStatusModal";
import { usePreviewButton } from "./usePreviewButton";
import { usePublishButton } from "./usePublishButton";
import { usePublishRun } from "./usePublishRun";
import { useSaveButton } from "./useSaveButton";

export const DevtoolsContent = () => {
  const save = useSaveButton();
  const preview = usePreviewButton();
  const publish = usePublishButton();
  const { data: run } = usePublishRun();
  const [modalOpen, setModalOpen] = useState(false);

  const publishLabel = !publish.hasToken
    ? "Missing publish token"
    : publish.isPending
      ? "Dispatching..."
      : publish.isRunning
        ? "Publishing..."
        : "Publish";

  return (
    <>
      <Button {...save.props} block>
        {save.isPending ? "Saving..." : `Save (${save.length})`}
      </Button>

      <Button {...preview.props} block>
        {preview.preview ? "Edit mode" : "Preview mode"}
      </Button>

      <div style={{ flex: "1 1 0" }} />

      <Space.Compact block>
        <Button
          {...publish.props}
          disabled={publish.props.disabled || !publish.hasToken}
          style={{ flex: 1 }}
        >
          {publishLabel}
        </Button>
        <Button
          icon={<PublishStatusIcon run={run} isPending={publish.isPending} />}
          onClick={() => setModalOpen(true)}
          disabled={!run && !publish.isPending}
        />
      </Space.Compact>

      <PublishStatusModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
