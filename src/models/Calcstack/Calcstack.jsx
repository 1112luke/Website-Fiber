import { Vector3 } from "three";
import { Books } from "./Books";
import { Microphone } from "./Microphone";
import { useEffect, useRef, useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";

export default function Calcstack({ name, focuseditem }) {
    var rotation = useRef(new Vector3());

    var [infocus, setinfocus] = useState(false);

    useEffect(() => {
        if (focuseditem == name) {
            setinfocus(true);
        } else {
            setinfocus(false);
        }
    }, [focuseditem]);

    return (
        <group scale={[0.1, 0.1, 0.1]}>
            <group name={name}>
                <Microphone></Microphone>
                <Books></Books>
            </group>
        </group>
    );
}
