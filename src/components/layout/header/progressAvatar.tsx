import { theme, Progress } from "antd";

interface ProgressAvatarProps {
  src?: string;
  label?: string;
  percent?: number;
}

export function ProgressAvatar({
  src,
  label = "",
  percent = 50,
}: ProgressAvatarProps) {
  const {
    token: { controlHeight },
  } = theme.useToken();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <img
        src={src}
        style={{
          padding: 1,
          height: controlHeight * 2,
        }}
      />
      {typeof percent === "number" ? (
        <div
          style={{
            position: "relative",
            height: "100%",
            width: controlHeight * 3,
            marginLeft: "10px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-10%",
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {label}
          </span>
          <Progress
            style={{
              position: "absolute",
              margin: 0,
              top: "50%",
            }}
            percent={percent}
            size="default"
            showInfo={false}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
