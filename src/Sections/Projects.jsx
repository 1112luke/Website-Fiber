import { Text3D } from "@react-three/drei";
import Timeline from "../Timeline";

export default function Projects() {
    return (
        <group position={[20, 10, 1350]} rotation={[0.4, -0.5, 0.1]}>
            <Text3D font="/assets/font.json" scale={[5, 5, 5]}>
                About
                <meshBasicMaterial color="#ffc600"></meshBasicMaterial>
            </Text3D>
            <Timeline
                position={[9, 1.8, -5]}
                rotation={[Math.PI / 2, 0, 0]}
            ></Timeline>
        </group>
    );
}
