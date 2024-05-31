import { Text3D } from "@react-three/drei";
import Timeline from "./Timeline";

export default function Projects() {
    return (
        <group position={[20, -20, 325]} rotation={[0.4, -0.6, 0.1]}>
            <Text3D font="/assets/font.json" scale={[5, 5, 5]}>
                Projects
                <meshStandardMaterial color="#ffc600"></meshStandardMaterial>
            </Text3D>
            <Timeline
                position={[9, 2.5, -5.5]}
                rotation={[Math.PI / 2, 0, 0]}
            ></Timeline>
        </group>
    );
}
