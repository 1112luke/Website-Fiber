import { Books } from "./Books";
import { Microphone } from "./Microphone";

export default function Calcstack({ name }) {
    return (
        <group scale={[0.1, 0.1, 0.1]}>
            <group name={name}>
                <Microphone></Microphone>
                <Books></Books>
            </group>
        </group>
    );
}
