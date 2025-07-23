import { DeleteOutlined } from "@ant-design/icons";
import { Image, Upload, theme } from "antd";
import { useCallback, useState } from "react";

interface UploadFieldProps {
  initialValue?: string;
  children?: React.ReactNode;
  width: string;
  height: string;
  onChange?: (value: any) => string;
}

export const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UploadField = ({
  initialValue,
  children,
  width,
  height,
  onChange,
}: UploadFieldProps) => {
  const {
    token: { borderRadius, paddingXXS },
  } = theme.useToken();

  const [prevImage, setPrevImage] = useState<string | undefined>(initialValue);
  const [hovering, setHovering] = useState(false);
  const removePrevImage = useCallback(() => {
    setPrevImage(undefined);
  }, []);

  const handleChange = (info: any) => {
    getBase64(info.file as any, (url) => onChange && onChange(url));
  };

  return (
    <>
      {prevImage ? (
        <div
          style={{
            position: "relative",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {hovering && (
            <DeleteOutlined
              onClick={removePrevImage}
              onMouseMove={() => setHovering(true)}
              onMouseOut={() => setHovering(false)}
              style={{
                position: "absolute",
                zIndex: 3,
                right: 0,
                borderRadius: borderRadius,
                padding: paddingXXS,
              }}
            />
          )}
          <Image
            src={prevImage}
            width={width}
            height={height}
            style={{ objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
          ></Image>
        </div>
      ) : (
        <Upload.Dragger
          name="files"
          listType="picture"
          beforeUpload={async () => {
            return false;
          }}
          defaultFileList={[]}
          onChange={handleChange}
          style={{ width, height, maxWidth: width }}
          accept="image/*"
        >
          {children}
        </Upload.Dragger>
      )}
    </>
  );
};

export default UploadField;
