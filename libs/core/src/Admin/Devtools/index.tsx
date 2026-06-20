import { Button, Drawer, FloatButton } from "antd";
import { PencilRuler } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePreviewButton } from "./usePreviewButton";
import { useSaveButton } from "./useSaveButton";

export const Devtools = () => {
  const [expanded, setExpanded] = useState(false);

  const save = useSaveButton();
  const preview = usePreviewButton();

  const drawerRef = useRef<HTMLDivElement>(null!);
  useEffect(function closeOnClickOutside() {
    const h = (e: MouseEvent) => {
      if (!drawerRef.current.contains(e.target as any)) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", h);

    return () => document.removeEventListener("click", h);
  }, []);

  return (
    <div
      style={{
        width: "192px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        display: "flex",
        pointerEvents: "none",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "40vh",
          width: "100%",
          position: "relative",
        }}
        ref={drawerRef}
      >
        <FloatButton.Group
          placement="right"
          style={{
            position: "fixed",
            top: "50%",
            left: "8px",
          }}
        >
          <FloatButton
            onClick={() => setExpanded((s) => !s)}
            shape="square"
            icon={<PencilRuler strokeWidth={1.2} size={20} />}
            style={{ pointerEvents: "all" }}
          />
        </FloatButton.Group>

        <Drawer
          open={expanded}
          mask={false}
          placement="left"
          size={192}
          onClose={() => setExpanded(false)}
          getContainer={false}
          style={{ pointerEvents: "all" }}
          title="Palimp menu"
          styles={{
            body: {
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            },
          }}
        >
          <Button {...save.props} block>
            {save.isPending ? "Saving..." : `Save (${save.length})`}
          </Button>

          <Button {...preview.props} block>
            {preview.preview ? "Edit mode" : "Preview mode"}
          </Button>

          <div style={{ flex: "1 1 0" }} />

          <Button disabled>Publish</Button>
        </Drawer>
      </div>
    </div>
  );
};
