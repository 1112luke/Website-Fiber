import { Text3D } from "@react-three/drei";
import Timeline from "./Timeline";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Orb from "./Orb";

export default function Projects({ setlookatpos }) {
    var textref = useRef();

    var allposition = [-3, -12, 242];
    var orbposition = [4, -3, -2];

    useFrame((state, delta) => {
        textref.current.lookAt(state.camera.position);
    });

    return (
        <group position={allposition}>
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
            <group position={orbposition}>
                <Orb setlookatpos={setlookatpos}></Orb>
            </group>
        </group>
    );
}
