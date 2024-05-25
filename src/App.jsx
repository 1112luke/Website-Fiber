import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    ScrollControls,
    Scroll,
    Html,
} from "@react-three/drei";
import "./App.css";
import { Color, Light } from "three";
import Cube from "./cube";
import Controlcam from "./Controlcam";
import Lightsi from "./lightsi";
import { Model } from "./Bat";
import Webplane from "./Webplane";

export default function App() {
    var cubesref = useRef(new Array());
    var [render, setrender] = useState(false);

    useEffect(() => {
        createCubes();

        //necessary because page was not rendering
        setrender(true);
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
                ></PerspectiveCamera>

                <Lightsi position={[0, 0, 0]}></Lightsi>

                <ambientLight intensity={2}></ambientLight>

                <ScrollControls damping={0.15} pages={1} distance={10}>
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
                        <Webplane></Webplane>
                        <Html>
                            <div className="navigation"></div>
                        </Html>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </>
    );
}
