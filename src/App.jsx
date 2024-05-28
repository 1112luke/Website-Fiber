import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    ScrollControls,
    Scroll,
    Html,
    Stars,
    Text3D,
} from "@react-three/drei";
import "./App.css";
import { Color, Light } from "three";
import Cube from "./cube";
import Controlcam from "./camera/Controlcam";
import Lightsi from "./lightsi";
import { Model } from "./Bat";
import Webplane from "./Webplane";
import Homescreen from "./Homescreen";

export default function App() {
    var cubesref = useRef(new Array());
    var [render, setrender] = useState(false);
    var radiusref = useRef(1500);

    useEffect(() => {
        createCubes();

        //necessary because page was not rendering
        setrender(true);
    }, []);

    function getPosition() {
        var theta = Math.random() * (2 * Math.PI);
        var phi = Math.random() * Math.PI;
        var rho = Math.random() * radiusref.current;

        return {
            x: rho * Math.sin(theta) * Math.cos(phi),
            y: rho * Math.sin(theta) * Math.sin(phi),
            z: rho * Math.cos(theta),
        };
    }

    function createCubes() {
        //create many cubes
        var numcubes = 5000;
        for (var i = 0; i < numcubes; i++) {
            var newpos = getPosition();
            cubesref.current.push({
                x: newpos.x,
                y: newpos.y,
                z: newpos.z,
                size: Math.random() * 2 + 0.1,
                key: i,
            });
            console.log("created");
        }
    }

    return (
        <>
            <Canvas>
                <color attach="background" args={["#193549"]}></color>

                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 0]}
                    far={3000}
                ></PerspectiveCamera>

                <Lightsi position={[0, 0, 0]}></Lightsi>

                <ambientLight intensity={2}></ambientLight>

                <ScrollControls damping={0.15} pages={2} distance={20}>
                    <Scroll render={render}>
                        {cubesref.current.map((cube) => {
                            return (
                                <Cube
                                    x={cube.x}
                                    y={cube.y}
                                    z={cube.z}
                                    size={cube.size}
                                    key={cube.key}
                                    id={cube.key}
                                ></Cube>
                            );
                        })}
                        <Controlcam></Controlcam>
                        <Model></Model>

                        <Text3D
                            font="/assets/font.json"
                            position={[20, 10, 1350]}
                            rotation={[1, 0, 0.2]}
                            scale={[5, 5, 5]}
                        >
                            About Me
                            <meshBasicMaterial color="#ffc600"></meshBasicMaterial>
                        </Text3D>
                    </Scroll>
                </ScrollControls>
                <Homescreen></Homescreen>
            </Canvas>
        </>
    );
}
