import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function Cube({ x, y, z, size }) {
    var ref = useRef();
    var colorref = useRef("orange");

    var seedref = useRef(Math.random() * 100);

    var scrollY = useScroll();

    useEffect(() => {
        ref.current.rotation.x = Math.random();
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y = scrollY.offset * 50 + seedref.current;
    });

    return (
        <mesh
            position={[x, y, -z]}
            ref={ref}
            onPointerOver={() => {
                colorref.current = "red";
                ref.current.scale.set(0.5, 0.5, 0.5);
            }}
            onPointerLeave={() => {
                colorref.current = "orange";
            }}
        >
            <boxGeometry args={[size, size, size]}></boxGeometry>
            <meshStandardMaterial
                color={colorref.current}
                wireframe={false}
            ></meshStandardMaterial>
        </mesh>
    );
}
