import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import "./App.css";

export default function Webplane() {
    var meshref = useRef();

    var { gl } = useThree();

    useFrame(() => {
        meshref.current.rotation.x += 0.0;
        meshref.current.rotation.y += 0.0;
    });

    return (
        <group ref={meshref} position={[0, 0, -20]}>
            <mesh>
                <planeGeometry width={20} height={20}></planeGeometry>
            </mesh>
            <Html
                style={{ width: "1920px", height: "1080px", background: "red" }}
                position={[0, 0, 0]}
                distanceFactor={0.2}
                portal={{ current: gl.domElement.parentNode }}
                transform
            >
                <iframe
                    style={{
                        width: "1920px",
                        height: "1080px",
                        backgroundColor: "white",
                    }}
                    src="https://www.lukescholler.com/"
                ></iframe>
            </Html>
        </group>
    );
}
