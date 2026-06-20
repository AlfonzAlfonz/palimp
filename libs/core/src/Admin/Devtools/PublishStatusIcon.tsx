import {
  CircleCheck,
  CircleDashed,
  CircleHelp,
  CircleMinus,
  CircleX,
  Loader2,
} from "lucide-react";
import type { PalimpPublishRun } from "../../PalimpPublishAdapter";

interface Props {
  run: PalimpPublishRun | null | undefined;
  isPending?: boolean;
  size?: number;
}

const spinStyle: React.CSSProperties = {
  animation: "palimp-spin 1s linear infinite",
};

const SpinKeyframes = () => (
  <style>{`@keyframes palimp-spin { to { transform: rotate(360deg); } }`}</style>
);

export const PublishStatusIcon = ({ run, isPending, size = 16 }: Props) => {
  if (isPending || (run && run.status !== "completed")) {
    return (
      <>
        <SpinKeyframes />
        <Loader2 size={size} style={spinStyle} />
      </>
    );
  }

  if (!run) {
    return <CircleDashed size={size} color="#bfbfbf" />;
  }

  switch (run.conclusion) {
    case "success":
      return <CircleCheck size={size} color="#52c41a" />;
    case "failure":
    case "timed_out":
      return <CircleX size={size} color="#ff4d4f" />;
    case "cancelled":
    case "skipped":
      return <CircleMinus size={size} color="#fa8c16" />;
    case "unknown":
    default:
      return <CircleHelp size={size} color="#8c8c8c" />;
  }
};
