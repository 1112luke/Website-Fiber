import { useRef, useState } from "react";
import { Laptop } from "../../models/Laptop";
import { useFrame, useThree } from "@react-three/fiber";
import useHover from "../../hooks/useHover";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import Webplane from "../../Webplane";

export default function Website({ position, model, innertext, name }) {
    var ref = useRef();

    var three = useThree();

    var transitiontime = 0.5;

    var vectorx = useRef(new Vector3(0, 1, 0));
    var vectory = useRef(new Vector3(-1, 0, 0));

    var [opacity, setopacity] = useState(0);

    var hoverpos = useHover(0.5, 0.5);

    var { mouse } = useThree();

    useFrame((state) => {
        ref.current.lookAt(state.camera.position);
        ref.current.rotateOnAxis(vectorx.current, mouse.x);
        ref.current.rotateOnAxis(vectory.current, mouse.y);
    });

    return (
        <group
            position={[
                position[0] + hoverpos[0],
                position[1] + hoverpos[1],
                position[2] + hoverpos[2],
            ]}
            ref={ref}
            onPointerOver={() => {
                setopacity(1);

                three.scene.getObjectByName(name).scale.x *= 4 / 3;
            }}
            onPointerLeave={() => {
                setopacity(0);

                three.scene.getObjectByName(name).scale.x *= 3 / 4;
            }}
        >
            <group position={[0, -2, 1]}>
                <Webplane
                    width={1920}
                    height={0}
                    distanceFactor={1}
                    inner={
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "red",
                                transition: `opacity ${transitiontime}s`,
                                opacity: opacity,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "200px",
                                    cursor: "default",
                                    color: "orange",
                                }}
                            >
                                {innertext}
                            </h2>
                        </div>
                    }
                ></Webplane>
            </group>

            {model}
        </group>
    );
}
