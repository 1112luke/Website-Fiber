import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import useHover from "../../hooks/useHover";

export default function Facecube({ pos }) {
    var { gl } = useThree();
    var cuberef = useRef();
    var position = useHover(0.5, 0.1);

    return (
        <mesh ref={cuberef} position={position} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
                wireframe={true}
                color={"#ffc600"}
            ></meshStandardMaterial>
            <Html
                style={{ width: "1080px", height: "1080px" }}
                portal={{ current: gl.domElement.parentNode }}
                distanceFactor={0.2}
                position={[0, 0, 0.5]}
                transform
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "red",
                        fontSize: 300,
                    }}
                >
                    photo of me
                </div>
            </Html>
        </mesh>
    );
}
