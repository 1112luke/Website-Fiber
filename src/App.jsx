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
    FirstPersonControls,
    PointerLockControls,
} from "@react-three/drei";
import "./App.css";
import { Color, Light, Quaternion } from "three";
import Cube from "./cube";
import Controlcam from "./camera/Controlcam";
import { Model } from "./Bat";
import { lazy } from "react";
import Homescreen from "./Screenhtml/Homescreen";
import Projects from "./Sections/projects/Projects";
import Webplane from "./Webplane";
import RotationControls from "./camera/RotationControls";
import Scrollindicator from "./Screenhtml/Scollindicator";
import Totop from "./Screenhtml/Totop";
import About from "./Sections/about/About";

export default function App() {
    var cubesref = useRef(new Array());
    var [render, setrender] = useState(false);
    var radiusref = useRef(300);

    var fp = false;
    var rc = false;
    var dc = true;

    useEffect(() => {
        createCubes();
    }, []);

    //gets a position in spherical coordinates for spawning cubes
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
        var numcubes = 500;
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
                <ambientLight intensity={1}></ambientLight>
                <directionalLight
                    intensity={1.5}
                    position={[0, 0, 2200]}
                ></directionalLight>

                {fp && (
                    <FirstPersonControls
                        activeLook={true}
                        lookSpeed={0.1}
                        movementSpeed={7}
                    ></FirstPersonControls>
                )}

                {rc && <RotationControls></RotationControls>}

                <Suspense fallback={null}>
                    <ScrollControls damping={0.15} pages={2} distance={20}>
                        {dc && <Controlcam></Controlcam>}
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

                            <About></About>
                            <Projects></Projects>
                            <Homescreen></Homescreen>
                        </Scroll>
                        <Scrollindicator></Scrollindicator>
                        <Totop></Totop>
                    </ScrollControls>
                </Suspense>
            </Canvas>

            <Loader></Loader>
        </>
    );
}
