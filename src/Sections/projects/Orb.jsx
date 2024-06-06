import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

export default function Orb() {
    var rotateref = useRef(null);

    var vectorx = useRef(new Vector3(0, 1, 0));

    var vectory = useRef(new Vector3(-1, 0, 1));

    var point = useRef(new Vector3(0, 0, 0));

    const Radius = 15;

    var numcubes = 200;

    var { mouse } = useThree();

    var three = useThree();

    var [pointarr, setpointarr] = useState([]);

    useEffect(() => {
        //spawn cubes
        if (pointarr.length == 0) {
            createCubes();
        }
    }, []);
    useFrame((state, delta) => {
        if (rotateref.current) {
            rotateref.current.rotateOnWorldAxis(
                vectory.current.normalize(),
                mouse.y * -0.05
            );
            rotateref.current.rotateOnWorldAxis(
                vectorx.current.normalize(),
                mouse.x * -0.08
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
            <group rotation={[0, 0, 0]} ref={rotateref}>
                {/*center */}
                <mesh scale={[0.2, 0.2, 0.2]}>
                    <meshBasicMaterial></meshBasicMaterial>
                    <sphereGeometry></sphereGeometry>
                </mesh>

                {/*cubes */}

                {pointarr.map((point) => {
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
                })}
            </group>
        </>
    );
}
