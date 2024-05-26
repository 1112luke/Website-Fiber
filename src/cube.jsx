import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";

export default function Cube({ x, y, z, size, id }) {
    var ref = useRef();
    var colorref = useRef("orange");
    var seedref = useRef(Math.random() - 0.5);
    var jarref = useRef(0);
    var scrollY = useScroll();

    var rotationref = useRef({
        x: Math.random() * 100,
        y: Math.random() * 100,
    });
    var directionref = useRef({ xacc: 0, yacc: 0, xvel: 0, yvel: 0 });

    useFrame((state, delta) => {
        //add fast rotation on hover

        //rotation

        //get chnage in rotation for frame
        var deltax = seedref.current * 0.03 + jarref.current * seedref.current;
        var deltay = seedref.current * 0.03 + jarref.current * seedref.current;

        //get current scrolloffset
        var scrolloffy =
            scrollY.offset * 300 * seedref.current + seedref.current * 50;
        var scrolloffx =
            scrollY.offset * 300 * seedref.current + seedref.current * 50;

        //increment rotationref
        rotationref.current.x += deltax;
        rotationref.current.y += deltay;

        ref.current.rotation.x = rotationref.current.x + scrolloffx;
        ref.current.rotation.y = rotationref.current.y + scrolloffy;

        if (jarref.current > 0) {
            jarref.current *= 0.98;
        }

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
        directionref.current.xvel *= 0.2;
        directionref.current.yvel *= 0.2;
    });

    return (
        <mesh
            position={[x, y, -z]}
            ref={ref}
            onPointerOver={() => {
                colorref.current = "red";
                jarref.current += 0.7;
            }}
            onPointerLeave={() => {
                colorref.current = "#ffc600";
            }}
        >
            <boxGeometry args={[size, size, size]}></boxGeometry>
            <meshBasicMaterial
                color={colorref.current}
                wireframe={true}
            ></meshBasicMaterial>
        </mesh>
    );
}
