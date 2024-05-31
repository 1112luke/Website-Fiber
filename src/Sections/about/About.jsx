import { Html, Text3D, useScroll } from "@react-three/drei";
import Facecube from "./Facecube";
import Webplane from "../../Webplane";
import Aboutmepage from "./Aboutmepage";
import useHover from "../../hooks/useHover";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function About() {
    const inner = <Aboutmepage></Aboutmepage>;
    var framehoverposition = useHover(0.6, 0.01);

    var ScrollY = useScroll();

    var [cubeslideposition, setcsp] = useState([9.8, 5, 2.5]);

    //0.25 - o.26

    useFrame(() => {
        var cubeFinalPosition = [9.8, 3, 2.5];
        var cubeStartingPosition = [9.8, 5, 2.5];

        var newpos = [
            cubeStartingPosition[0] +
                (cubeFinalPosition[0] - cubeStartingPosition[0]) *
                    ScrollY.range(0.24, 0.02),
            cubeStartingPosition[1] +
                (cubeFinalPosition[1] - cubeStartingPosition[1]) *
                    ScrollY.range(0.24, 0.02),
            cubeStartingPosition[2] +
                (cubeFinalPosition[2] - cubeStartingPosition[2]) *
                    ScrollY.range(0.24, 0.02),
        ];

        setcsp(newpos);
    });

    return (
        <group position={[20, -20, 325]} rotation={[0.4, -0.6, 0.1]}>
            {ScrollY.visible(0.24, 0.26) ? (
                <group
                    position={cubeslideposition}
                    rotation={[0.3, -0.2, -1.6]}
                    scale={[0.3, 0.3, 0.3]}
                >
                    <Facecube></Facecube>
                </group>
            ) : (
                <></>
            )}

            <group
                position={[9.71, 2.12, 2.65]}
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
