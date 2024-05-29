import { Html } from "@react-three/drei";
import Webplane from "./Webplane";

export default function Timeline({ position, rotation }) {
    const labels = ["1", "2", "3", "4", "5"];
    var total = 20;
    var width = 1000;

    var ticks = [];
    var labelels = [];

    //space ticks evenly along length
    //calculate start position
    var start = 0 - width / 2;

    for (var i = 0; i < total; i++) {
        ticks.push(
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, start + (i * width) / total, 0]}
            >
                <meshStandardMaterial></meshStandardMaterial>
                <cylinderGeometry args={[0.5, 0.5, 20]}></cylinderGeometry>
            </mesh>
        );
    }

    //make labels
    for (var i = 0; i < labels.length; i++) {
        labelels.push(
            //tick

            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, start + (i * width) / labels.length, 0]}
            >
                <meshStandardMaterial></meshStandardMaterial>
                <cylinderGeometry args={[0.5, 0.5, 30]}></cylinderGeometry>
                <Webplane></Webplane>
            </mesh>
        );
    }

    return (
        <group
            position={position}
            rotation={rotation}
            scale={[0.01, 0.01, 0.01]}
        >
            {/*large one*/}
            <mesh>
                <meshStandardMaterial></meshStandardMaterial>
                <cylinderGeometry args={[2, 2, width]}></cylinderGeometry>
            </mesh>

            {/*small ticks*/}
            {ticks}
            {labelels}
        </group>
    );
}
