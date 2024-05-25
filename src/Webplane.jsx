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
        <mesh position={[0, 0, -20]} ref={meshref}>
            <planeGeometry width={20} height={20}></planeGeometry>
            <Html transform occlude position={[0, 0, 1]}>
                <div className="testblock"> hi </div>
            </Html>
        </mesh>
    );
}
