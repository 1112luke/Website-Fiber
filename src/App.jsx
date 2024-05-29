import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    ScrollControls,
    Scroll,
    Html,
    Stars,
    Text3D,
    Loader,
} from "@react-three/drei";
import "./App.css";
import { Color, Light } from "three";
import Cube from "./cube";
import Controlcam from "./camera/Controlcam";
import { Model } from "./Bat";
import { lazy } from "react";
import Homescreen from "./Homescreen";
import Projects from "./Sections/Projects";
import Webplane from "./Webplane";

export default function App() {
    var cubesref = useRef(new Array());
    var [render, setrender] = useState(false);
    var radiusref = useRef(1500);

    useEffect(() => {
        createCubes();
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
        setrender(true);
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

                <ambientLight intensity={2}></ambientLight>

                <Suspense fallback={null}>
                    <ScrollControls damping={0.15} pages={2} distance={20}>
                        <Controlcam></Controlcam>
                        <Scroll>
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

                            <Model></Model>
                            <Webplane></Webplane>

                            <Projects></Projects>
                            <Homescreen></Homescreen>
                        </Scroll>
                    </ScrollControls>
                </Suspense>
            </Canvas>

            <Loader></Loader>
        </>
    );
}
