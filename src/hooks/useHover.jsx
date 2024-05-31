import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function useHover(speed, magnitude) {
    var countref = useRef(Math.random() * 100);
    var [position, setpos] = useState([0, 0, 0]);

    useFrame((state, delta) => {
        countref.current += delta;

        setpos(getHover(countref.current));
    });

    var speed = speed ? speed : 0.5;
    var magnitude = magnitude ? magnitude : 0.1;

    function getHover(time) {
        time *= speed;

        var xpos = Math.cos(time) * magnitude;

        var ypos = Math.sin(time * 2 + 0.2) * magnitude;

        var zpos = Math.sin(time + 0.2) * 0.1 * magnitude;

        return [xpos, ypos, zpos];
    }

    return position;
}
