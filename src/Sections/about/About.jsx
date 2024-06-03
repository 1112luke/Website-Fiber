import { Html, Text3D, useScroll } from "@react-three/drei";
import Facecube from "./Facecube";
import Webplane from "../../Webplane";
import Aboutmepage from "./Aboutmepage";
import useHover from "../../hooks/useHover";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import useSlide from "../../hooks/useSlide";

export default function About() {
    const inner = <Aboutmepage></Aboutmepage>;
    var framehoverposition = useHover(0.6, 0.01);

    var ScrollY = useScroll();

    var cubeslide = useSlide([9.8, 5, 2.5], [9.8, 3, 2.5], 0.24, 0.26);

    var frameslide = useSlide([10, -1, 2.5], [9.71, 2.12, 2.65], 0.24, 0.26);

    return (
        <group position={[20, -20, 325]} rotation={[0.4, -0.6, 0.1]}>
            {cubeslide.inview ? (
                <group
                    position={cubeslide.pos}
                    rotation={[0.3, -0.2, -1.6]}
                    scale={[0.3, 0.3, 0.3]}
                >
                    <Facecube></Facecube>
                </group>
            ) : (
                <></>
            )}
            {frameslide.inview ? (
                <group
                    position={frameslide.pos}
                    rotation={[-0.4, 0.0, -1.7]}
                    scale={[0.8, 0.8, 0.8]}
                >
                    <group position={framehoverposition}>
                        <Webplane
                            width={1500}
                            height={1920}
                            inner={inner}
                        ></Webplane>
                    </group>
                </group>
            ) : (
                <></>
            )}
            <Text3D
                font="/assets/font.json"
                scale={[3, 3, 3]}
                position={[1, 5, 2]}
            >
                <meshStandardMaterial color="orange"></meshStandardMaterial>
                Hi,
            </Text3D>
            <Text3D
                font="/assets/font.json"
                scale={[3, 3, 3]}
                position={[1, 1, 2]}
            >
                <meshStandardMaterial color="orange"></meshStandardMaterial>
                I'm Luke
            </Text3D>
        </group>
    );
}
