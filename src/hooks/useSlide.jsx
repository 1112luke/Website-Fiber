import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function useSlide(startpos, endpos, scrollstart, scrollend) {
    var ScrollY = useScroll();

    var [cubeslideposition, setcsp] = useState({
        pos: startpos,
        inview: false,
    });

    useFrame(() => {
        var cubeFinalPosition = endpos;
        var cubeStartingPosition = startpos;

        var newpos = [
            cubeStartingPosition[0] +
                (cubeFinalPosition[0] - cubeStartingPosition[0]) *
                    ScrollY.range(scrollstart, scrollend - scrollstart),
            cubeStartingPosition[1] +
                (cubeFinalPosition[1] - cubeStartingPosition[1]) *
                    ScrollY.range(scrollstart, scrollend - scrollstart),
            cubeStartingPosition[2] +
                (cubeFinalPosition[2] - cubeStartingPosition[2]) *
                    ScrollY.range(scrollstart, scrollend - scrollstart),
        ];

        setcsp({
            pos: newpos,
            inview: ScrollY.visible(scrollstart, scrollend),
        });
    });

    return cubeslideposition;
}
