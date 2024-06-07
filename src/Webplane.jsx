import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import "./App.css";

export default function Webplane({
    width,
    height,
    src,
    distanceFactor,
    inner,
}) {
    var meshref = useRef();

    var { gl } = useThree();

    return (
        <Html
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
            position={[0, 0, 0]}
            distanceFactor={distanceFactor ? distanceFactor : 0.2}
            portal={{ current: gl.domElement.parentNode }}
            transform
        >
            {src ? (
                <iframe
                    style={{
                        width: `100%`,
                        height: `100%`,
                        backgroundColor: "white",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    src={src}
                ></iframe>
            ) : (
                inner
            )}
        </Html>
    );
}
