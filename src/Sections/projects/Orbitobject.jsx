import { useEffect, useRef, useState } from "react";
import { Laptop } from "../../models/Laptop";
import { useFrame, useThree } from "@react-three/fiber";
import useHover from "../../hooks/useHover";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import Webplane from "../../Webplane";
import { useSpring } from "framer-motion";

export default function Orbitobject({
    position,
    model,
    innertext,
    name,
    setrotating,
    camposition,
    rotating,
    setlookatpos,
    setfocuseditem,
}) {
    var ref = useRef();
    var three = useThree();

    var localpos = useRef(new Vector3(0, 0, 0));
    var referencevec = useRef(new Vector3(0, 0, 0));

    var [focused, setfocused] = useState(false);

    //for display of webplane
    var transitiontime = 0.5;
    var [opacity, setopacity] = useState(0);

    //for rotation
    var vectorx = useRef(new Vector3(0, 1, 0));
    var vectory = useRef(new Vector3(-1, 0, 0));
    var mouse = three.mouse;

    //for spring effect oh hover
    var scale = useSpring(10, { stiffness: 300, damping: 10 });
    var scaletarget = useRef(10);

    //potentially make spring effect for smooth on focus behavior

    //hover
    var hoverpos = useHover(0.5, 0.5);

    useFrame((state) => {
        //rotate based on mouse
        ref.current.lookAt(state.camera.position);
        if (!focused) {
            //move based on mouse
            ref.current.rotateOnAxis(vectorx.current, mouse.x);
            ref.current.rotateOnAxis(vectory.current, mouse.y);
            //set scale
            three.scene.getObjectByName(name).scale.x = scale.current;
            three.scene.getObjectByName(name).scale.y = scale.current;
            three.scene.getObjectByName(name).scale.z = scale.current;

            if (referencevec.x != 0) {
                setlookatpos(new Vector3(0, 0, 0));
                referencevec.current = new Vector3(0, 0, 0);
            }

            setfocuseditem("");
        }

        if (focused) {
            //set position
            localpos.current = camposition();

            //set focused item
            setfocuseditem(name);

            //translate to be in frame
            (localpos.current.x -= 0),
                (localpos.current.y -= 6),
                (localpos.current.z -= 0.7),
                //set lookat position
                ref.current.getWorldPosition(referencevec.current);
            //translate to look more directly
            referencevec.current.x += 0.5;
            referencevec.current.y += 0.8;
            setlookatpos(referencevec.current);

            //move based on mouse slower
            ref.current.rotateOnAxis(vectorx.current, mouse.x * 0.15);
            ref.current.rotateOnAxis(vectory.current, mouse.y * 0.1);
        }
    });

    //set scale when scaletarget changes
    useEffect(() => {
        scale.set(scaletarget.current);
    }, [scaletarget.current]);

    return (
        <group
            position={
                !focused
                    ? [
                          position[0] + hoverpos[0],
                          position[1] + hoverpos[1],
                          position[2] + hoverpos[2],
                      ]
                    : [
                          localpos.current.x,
                          localpos.current.y,
                          localpos.current.z,
                      ]
            }
            ref={ref}
            onPointerOver={() => {
                //show label
                setopacity(1);
                //scale
                scaletarget.current *= 4 / 3;
            }}
            onClick={(e) => {
                //set focused
                setfocused(!focused);

                //set rotating
                setrotating(!rotating);

                //because I am clicking multiple of the models
                e.stopPropagation();
            }}
            onPointerLeave={() => {
                //hide label
                setopacity(0);
                //scale
                scaletarget.current *= 3 / 4;
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