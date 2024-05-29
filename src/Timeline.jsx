import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Webplane from "./Webplane";

export default function Timeline({ position, rotation }) {
    const labels = ["2004", "2019", "2022", "2023", "2024", "working on"];
    var total = 20;
    var width = 1000;

    var ticks = [];
    var labelels = [];

    var { gl } = useThree();

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
                position={[0, start + width - (i * width) / labels.length, 0]}
            >
                <meshStandardMaterial></meshStandardMaterial>
                <cylinderGeometry args={[0.5, 0.5, 30]}></cylinderGeometry>
                <Html
                    style={{
                        width: "1920px",
                        height: "1080px",
                    }}
                    position={[0, 0, 0]}
                    rotation={[0, Math.PI / 2, Math.PI]}
                    distanceFactor={9}
                    portal={{ current: gl.domElement.parentNode }}
                    transform
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "black",
                                width: "50%",
                                height: "50%",
                                borderRadius: "500px",
                                border: "5px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "400px",
                                    color: "white",
                                }}
                            >
                                {labels[i]}
                            </h1>
                        </div>
                    </div>
                </Html>
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
