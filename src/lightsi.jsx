import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Lightsi() {
    var ref = useRef();

    useFrame((state, delta) => {
        ref.current.position.x = state.camera.position.x;
        ref.current.position.y = state.camera.position.y;
        ref.current.position.z = state.camera.position.z;
    });

    return (
        <pointLight
            position={(0, 0, 0)}
            intensity={5}
            distance={0}
            decay={2}
            ref={ref}
        ></pointLight>
    );
}
