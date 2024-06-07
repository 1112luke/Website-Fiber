import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import Aboutmepage from "../about/Aboutmepage";
import About from "../about/About";
import { Laptop } from "../../models/Laptop";
import useHover from "../../hooks/useHover";
import Orbitobject from "./Orbitobject";

export default function Orb({ setlookatpos }) {
    var rotateref = useRef(null);

    var [rotating, setrotating] = useState(true);

    var hoverpos = useHover(0.5, 1);

    var vectorx = useRef(new Vector3(0, 1, 0));

    var vectory = useRef(new Vector3(-1, 0, 1));

    var [focuseditem, setfocuseditem] = useState("");

    var three = useThree();

    const Radius = 15;

    var numcubes = 200;

    var mouse = three.mouse;

    var [pointarr, setpointarr] = useState([]);

    function getLocalCamPos() {
        var vec = new Vector3();
        vec.x = three.camera.position.x;
        vec.y = three.camera.position.y;
        vec.z = three.camera.position.z;

        rotateref.current.worldToLocal(vec);

        return vec;
    }

    useEffect(() => {
        //spawn cubes
        if (pointarr.length == 0) {
            createCubes();
        }
    }, []);

    useFrame((state, delta) => {
        if (rotateref.current && rotating) {
            rotateref.current.rotateOnWorldAxis(
                vectory.current.normalize(),
                mouse.y * -0.03
            );
            rotateref.current.rotateOnWorldAxis(
                vectorx.current.normalize(),
                mouse.x * -0.05
            );
        }
    });

    function createCubes() {
        var phi = Math.PI * (Math.sqrt(5) - 1);

        var newcubes = [];

        for (var i = 0; i < numcubes; i++) {
            var y = 1 - (i / (numcubes - 1)) * 2;

            var theta = phi * i;

            var currradius = Math.sqrt(1 - y * y);

            //convert to cartesian
            var currx = currradius * Math.cos(theta) * Radius;
            var curry = y * Radius;
            var currz = currradius * Math.sin(theta) * Radius;

            newcubes.push({
                x: currx,
                y: curry,
                z: currz,
                key: i,
            });
        }

        setpointarr(newcubes);
    }

    return (
        <>
            <group rotation={[0, 0, 0]} ref={rotateref} position={hoverpos}>
                {/*center
                 <mesh scale={[0.2, 0.2, 0.2]}>
                    <meshBasicMaterial></meshBasicMaterial>
                    <sphereGeometry></sphereGeometry>
                </mesh>
                */}

                {/*cubes */}

                {pointarr.map((point, index) => {
                    if (index == 0) {
                        return (
                            <Orbitobject
                                model={
                                    <Laptop
                                        scale={[10, 10, 10]}
                                        name="Laptop"
                                        focuseditem={focuseditem}
                                    ></Laptop>
                                }
                                name="Laptop"
                                innertext="This Website"
                                position={[point.x, point.y, point.z]}
                                setrotating={setrotating}
                                rotating={rotating}
                                camposition={getLocalCamPos}
                                setlookatpos={setlookatpos}
                                setfocuseditem={setfocuseditem}
                                key={index}
                            ></Orbitobject>
                        );
                    }
                    if (index > 0) {
                        return (
                            <mesh
                                scale={[0.2, 0.2, 0.2]}
                                position={[point.x, point.y, point.z]}
                                key={point.key}
                            >
                                <meshBasicMaterial></meshBasicMaterial>
                                <sphereGeometry></sphereGeometry>
                            </mesh>
                        );
                    }
                })}
            </group>
        </>
    );
}
