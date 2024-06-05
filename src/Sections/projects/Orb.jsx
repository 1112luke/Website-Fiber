import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function Orb() {
    var rotateref = useRef();

    const Radius = 15;

    var numcubes = 2;

    var { mouse } = useThree();

    var [pointarr, setpointarr] = useState([]);
    var [cuberotation, setcuberotation] = useState([0, 0, 0]);

    useEffect(() => {
        //spawn cubes
        if (pointarr.length == 0) {
            createCubes();
        }
    }, []);

    useFrame((state, delta) => {
        if (pointarr.length == numcubes) {
            rotatePoints();
            console.log("rotation", pointarr);
        }
    });

    function createCubes() {
        var phi = Math.PI * (Math.sqrt(5) - 1);

        var newcubes = [];

        for (var i = 0; i < numcubes; i++) {
            var y = 1 - (i / (numcubes - 1)) * 2;

            var theta = phi * i;

            var currradius = Math.sqrt(1 - y * y);

            newcubes.push({
                x: currradius * Math.cos(theta) * Radius,
                y: y * Radius,
                z: currradius * Math.sin(theta) * Radius,
                key: i,
            });

            setpointarr(newcubes);
        }
    }

    function rotatePoints() {
        //this is not working, check console log. trying to rotate points by converting and incrementing theta and phi;
        var points = pointarr;
        for (var i = 0; i < numcubes; i++) {
            var point = points[i];
            //convert to spherical
            var rho = Math.sqrt(
                point.x * point.x + point.y * point.y + point.z * point.z
            );
            var phi = Math.atan2(point.y, point.x);
            var theta = Math.acos(point.z / rho);

            //change
            theta += 0.1;
            phi += 0.1;

            //convert back to cartesian
            var newpoint = {
                x: rho * Math.sin(theta) * Math.cos(phi),
                y: rho * Math.sin(theta) * Math.sin(phi),
                z: rho * Math.cos(theta),
                key: point.key,
            };
            points[i] = newpoint;
        }
        setpointarr(points);
    }

    return (
        <group rotation={cuberotation} ref={rotateref}>
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
    );
}
