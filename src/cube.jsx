import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function Cube({ x, y, z, size }) {
    var ref = useRef();
    var colorref = useRef("orange");
    var seedref = useRef(Math.random() * 100);
    var scrollY = useScroll();

    var directionref = useRef({ xacc: 0, yacc: 0, xvel: 0, yvel: 0 });

    useEffect(() => {
        ref.current.rotation.x = Math.random();
    }, []);

    useFrame((state, delta) => {
        //add fast rotation on hover

        //scrolling
        ref.current.rotation.x += delta;
        ref.current.rotation.y = scrollY.offset * 50 + seedref.current;

        //jerk
        var xaccchange = Math.random() * 0.001 - 0.001 / 2;
        var yaccchange = Math.random() * 0.001 - 0.001 / 2;
        //acceleration
        directionref.current.xacc += xaccchange;
        directionref.current.yacc += yaccchange;
        //velocity
        directionref.current.xvel += directionref.current.xacc;
        directionref.current.yvel += directionref.current.yacc;
        //posision
        ref.current.position.x += directionref.current.xvel;
        ref.current.position.y += directionref.current.yvel;

        //damping
        directionref.current.xvel *= 0.3;
        directionref.current.yvel *= 0.3;
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
