import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import useHover from "../../hooks/useHover";

export default function Facecube({ img }) {
    var { gl } = useThree();
    var cuberef = useRef();
    var position = useHover(0.5, 0.1);

    var images = ["nd.png", "EE.png", "code.jpg"];

    var imageels = [];

    for (var i = 0; i < 6; i++) {
        var pos;
        var rot;

        switch (i) {
            case 0:
                //front
                pos = [0, 0, 0.50001];
                rot = [0, 0, 0];
                break;
            case 1:
                //back
                pos = [0, 0, -0.50001];
                rot = [0, Math.PI, 0];
                break;
            case 2:
                //left
                pos = [-0.50001, 0, 0];
                rot = [0, -Math.PI / 2, 0];
                break;
            case 3:
                //right
                pos = [0.50001, 0, 0];
                rot = [0, Math.PI / 2, 0];
                break;
            case 4:
                //bottom
                pos = [0, -0.50001, 0];
                rot = [Math.PI / 2, 0, 0];
                break;
            case 5:
                //top
                pos = [0, 0.50001, 0];
                rot = [-Math.PI / 2, 0, 0];
                break;
        }

        imageels.push(
            <Html
                style={{ width: "1080px", height: "1080px" }}
                portal={{ current: gl.domElement.parentNode }}
                distanceFactor={0.372}
                position={pos}
                rotation={rot}
                key={i}
                transform
                occlude
            >
                {img >= 0 && img <= 6 ? (
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            fontSize: 300,
                        }}
                        src={`/assets/${images[img]}`}
                    ></img>
                ) : (
                    <></>
                )}
            </Html>
        );
    }

    return (
        <mesh ref={cuberef} position={position} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
                wireframe={true}
                color={"#ffc600"}
            ></meshStandardMaterial>
            {imageels}
        </mesh>
    );
}
