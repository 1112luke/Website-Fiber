import { Html, Text3D, useScroll } from "@react-three/drei";
import Facecube from "./Facecube";
import Webplane from "../../Webplane";
import Aboutmepage from "./Aboutmepage";
import useHover from "../../hooks/useHover";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import useSlide from "../../hooks/useSlide";

export default function About() {
    const inner = <Aboutmepage spin={spinCube}></Aboutmepage>;
    var framehoverposition = useHover(0.6, 0.01);

    var [currimg, setcurrimg] = useState(0);

    var ScrollY = useScroll();

    var [cuberot, setcuberot] = useState([0.3, -0.2, -1.6]);
    var rotspeed = useRef(0);

    var cubeslide = useSlide([9.8, 5, 2.5], [9.8, 3, 2.5], 0.24, 0.26);

    var frameslide = useSlide([10, -1, 2.5], [9.71, 2.12, 2.65], 0.24, 0.26);

    function spinCube(img) {
        setTimeout(() => {
            setcurrimg(img);
        }, 100);

        rotspeed.current = 50;
    }

    useFrame(() => {
        rotspeed.current *= 0.9;

        var newx = cuberot[0] + rotspeed.current * 0.1;
        var newy = cuberot[1] + rotspeed.current * 0.01;
        var newz = cuberot[2];

        setcuberot([newx, newy, newz]);
    });

    return (
        <group position={[20, -20, 325]} rotation={[0.4, -0.6, 0.1]}>
            {cubeslide.inview ? (
                <group
                    position={cubeslide.pos}
                    rotation={cuberot}
                    scale={[0.3, 0.3, 0.3]}
                >
                    <Facecube img={currimg}></Facecube>
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
