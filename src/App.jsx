import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Light } from "three";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <Canvas>
            <directionalLight
                position={[0, 0, 5]}
                intensity={2}
            ></directionalLight>

            <mesh position={[1, 0, 0]}>
                <boxGeometry></boxGeometry>
                <meshStandardMaterial
                    color="orange"
                    wireframe={false}
                ></meshStandardMaterial>
            </mesh>
        </Canvas>
    );
}
