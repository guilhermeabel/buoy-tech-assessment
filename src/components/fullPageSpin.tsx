import { Spin } from "antd";

export function FullPageSpin() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Spin
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        size="large"
      />
      ;
    </div>
  );
}
