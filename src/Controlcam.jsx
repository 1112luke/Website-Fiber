import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Controlcam() {
    var posx = useRef();
    var posy = useRef();

    var yes = useThree();

    var ScrollY = useScroll();

    useEffect(() => {
        //control camera
        window.addEventListener("mousemove", (e) => {
            posx.current = (e.clientX / window.innerWidth) * 2 - 1;
            posy.current = (e.clientY / window.innerHeight) * 2 - 1;
        });
        yes.camera.position.x = 0;
        yes.camera.position.y = 0;
        yes.camera.position.z = 0;
    }, []);

    useFrame((state, delta) => {
        state.camera.position.x = posx.current;
        state.camera.position.y = -posy.current;
        state.camera.position.z = -ScrollY.offset * 20;
    });

    return <></>;
}
