import { Center, Html } from "@react-three/drei";

interface HTMLModelProps {
  width: string;
  height: string;
  borderRadius?: string;
  position?: [number, number, number];
  children?: React.ReactNode;
}

const HTMLModel: React.FC<HTMLModelProps> = ({
  width,
  height,
  borderRadius,
  position,
  children,
}) => {
  return (
    <Center>
      <Html
        style={{
          userSelect: "none",
          width,
          height,
          borderRadius: borderRadius || "0px",
          overflow: "hidden",
        }}
        transform
        position={position}
        scale={0.3}
      >
        {children}
      </Html>
    </Center>
  );
};

export default HTMLModel;
