import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, ScrollControls, Scroll } from "@react-three/drei";
import "./App.css";
import { Light } from "three";
import Cube from "./cube";
import Controlcam from "./Controlcam";

export default function App() {
    //camera position not propeerly initialized, and need to figure out how to move with scroll in controlcam

    var [cameraPosition, setCameraPosition] = useState([0, 0, 0]);

    var cubesref = useRef(new Array());

    useEffect(() => {
        //control camera
        window.addEventListener("mousemove", (e) => {
            setCameraPosition(calculateCameraPosition(e));
        });

        createCubes();
    }, []);

    function createCubes() {
        //create many cubes
        var numcubes = 1000;
        for (var i = 0; i < numcubes; i++) {
            cubesref.current.push({
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                z: Math.random() * 40,
                size: Math.random() * 0.5 + 0.1,
                key: i,
            });
            console.log("pushed");
        }
    }

    function calculateCameraPosition(e) {
        var x = (e.clientX / window.innerWidth) * 2 - 1;
        var y = (e.clientY / window.innerHeight) * 2 - 1;
        var z = 10;
        return [x, -y, z];
    }

    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                position={cameraPosition}
            ></PerspectiveCamera>

            <directionalLight
                position={[0, 0, 5]}
                intensity={2}
            ></directionalLight>

            <ScrollControls damping={0.1} pages={1} distance={10}>
                <Scroll>
                    {cubesref.current.map((cube) => {
                        return (
                            <Cube
                                x={cube.x}
                                y={cube.y}
                                z={cube.z}
                                size={cube.size}
                                key={cube.key}
                            ></Cube>
                        );
                    })}
                    <Controlcam></Controlcam>
                </Scroll>
            </ScrollControls>
        </Canvas>
    );
}
