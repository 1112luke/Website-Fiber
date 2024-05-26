import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import "./App.css";

export default function Webplane() {
    var meshref = useRef();

    useFrame(() => {
        meshref.current.rotation.x += 0.01;
        meshref.current.rotation.y += 0.001;
    });

    return (
        <mesh ref={meshref} position={[0, 0, -20]}>
            <planeGeometry width={20} height={20}></planeGeometry>
            <Html
                style={{ width: 50, height: 50, background: "red" }}
                transform
                occlude
            >
                <h1 className="testblock">
                    this text should follow the plane{" "}
                </h1>
            </Html>
        </mesh>
    );
}
