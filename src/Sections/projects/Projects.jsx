import { Text3D, useScroll } from "@react-three/drei";
import Timeline from "./Timeline";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Orb from "./Orb";

export default function Projects({ setlookatpos, setcamrotate }) {
    var textref = useRef();

    var allposition = [-3, -12, 242];
    var orbposition = [4, -3, -2];

    var [inview, setinview] = useState(false);

    var scrolldat = useScroll();

    useFrame((state, delta) => {
        textref.current.lookAt(state.camera.position);

        setinview(scrolldat.visible(0.5, 0.6));
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
            {inview && (
                <group position={orbposition}>
                    <Orb
                        setlookatpos={setlookatpos}
                        setcamrotate={setcamrotate}
                    ></Orb>
                </group>
            )}
        </group>
    );
}
