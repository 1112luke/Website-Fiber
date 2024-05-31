import { Html, useScroll } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Scrollindicator() {
    var scrollY = useScroll();

    var ref = useRef();

    useFrame(() => {
        ref.current.style.width = `${scrollY.offset * 100}%`;
    });

    return (
        <Html>
            <div id="scrollindicator" ref={ref}></div>
        </Html>
    );
}
