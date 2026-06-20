import { createStyles, keyframes } from "antd-style";
import { LoaderPinwheel } from "lucide-react";

interface Props {
  size?: number;
}

export const Spinner = ({ size = 48 }: Props) => {
  const { styles } = useStyles();
  return (
    <div
      style={{
        flex: "1 1 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <LoaderPinwheel
        className={styles.spin}
        size={size}
        strokeWidth={1.2}
        color={"oklch(86.9% 0.022 252.894)"}
      />
    </div>
  );
};

const useStyles = createStyles(({ css }) => {
  const spin = keyframes`
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  return {
    spin: css`
      animation: ${spin} 1s linear infinite;
    `,
  };
});
