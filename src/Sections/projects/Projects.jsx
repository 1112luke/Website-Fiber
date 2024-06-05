import { Text3D } from "@react-three/drei";
import Timeline from "./Timeline";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Orb from "./Orb";

export default function Projects() {
    var textref = useRef();

    useFrame((state, delta) => {
        textref.current.lookAt(state.camera.position);
    });

    return (
        <group position={[-3, -12, 242]}>
            {/*text */}
            <group ref={textref}>
                <Text3D
                    font="/assets/font.json"
                    position={[-10, 8, 0]}
                    rotation={[0, -0.1, 0]}
                    scale={[5, 5, 5]}
                >
                    Projects
                    <meshStandardMaterial color="#ffc600"></meshStandardMaterial>
                </Text3D>
            </group>
            {/*orb */}
            <group position={[4, -3, -2]}>
                <Orb></Orb>
            </group>
        </group>
    );
}
