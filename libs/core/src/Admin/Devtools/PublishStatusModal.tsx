import { Button, Modal, Space, Typography } from "antd";
import { queryClient } from "../queryClient";
import { PublishStatusIcon } from "./PublishStatusIcon";
import { publishRunQueryKey, usePublishRun } from "./usePublishRun";

interface Props {
  open: boolean;
  onClose: () => void;
}

const relativeFormat = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const formatRelative = (ms: number) => {
  const diffSeconds = Math.round((ms - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  if (abs < 60) return relativeFormat.format(diffSeconds, "second");
  if (abs < 3600)
    return relativeFormat.format(Math.round(diffSeconds / 60), "minute");
  if (abs < 86400)
    return relativeFormat.format(Math.round(diffSeconds / 3600), "hour");
  return relativeFormat.format(Math.round(diffSeconds / 86400), "day");
};

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
    <div style={{ width: 96, color: "#8c8c8c", flexShrink: 0 }}>{label}</div>
    <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
  </div>
);

export const PublishStatusModal = ({ open, onClose }: Props) => {
  const { data: run, error, isFetching, refetch } = usePublishRun();

  const conclusionLabel =
    run?.status === "completed"
      ? (run.conclusion ?? "unknown")
      : run?.status;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <Space>
          <span>Publish status</span>
          <PublishStatusIcon run={run} />
        </Space>
      }
      footer={
        <Space>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: publishRunQueryKey })
            }
            loading={isFetching}
            disabled={isFetching}
          >
            Refresh
          </Button>
          <Button onClick={onClose} type="primary">
            Close
          </Button>
        </Space>
      }
    >
      {error ? (
        <div>Couldn't load run status.</div>
      ) : !run ? (
        <div>No publish has been dispatched yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Row label="Dispatched">
            <span title={new Date(run.dispatchedAt).toISOString()}>
              {formatRelative(run.dispatchedAt)}
            </span>
          </Row>
          <Row label="Status">{conclusionLabel}</Row>
          <Row label="Run id">
            <Space>
              <Typography.Text code copyable={{ text: run.id }}>
                {run.id}
              </Typography.Text>
            </Space>
          </Row>
          {run.url ? (
            <Row label="Link">
              <a href={run.url} target="_blank" rel="noreferrer">
                Open in GitHub Actions
              </a>
            </Row>
          ) : null}
        </div>
      )}
    </Modal>
  );
};
