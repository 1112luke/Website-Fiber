import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Controlcam() {
    var ScrollY = useScroll();

    useFrame((state, delta) => {
        state.camera.position.z = -ScrollY.offset * 20;
    });

    return <></>;
}
