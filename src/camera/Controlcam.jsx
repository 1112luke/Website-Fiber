import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Controlcam() {
    var posx = useRef();
    var posy = useRef();
    var currentPathRef = useRef(0);
    var startingpos = useRef({
        x: -500,
        y: -200,
        z: 2000,
        xr: 0,
        yr: 0,
        zr: 0,
    });

    var yes = useThree();

    var ScrollY = useScroll();

    useEffect(() => {
        //control camera
        window.addEventListener("mousemove", (e) => {
            posx.current = (e.clientX / window.innerWidth) * 8 - 4;
            posy.current = (e.clientY / window.innerHeight) * 8 - 4;
        });
        //initialize camera
        yes.camera.position.x = startingpos.current.x;
        yes.camera.position.y = startingpos.current.x;
        yes.camera.position.z = startingpos.current.x;
        yes.camera.rotation.x = startingpos.current.xr;
        yes.camera.rotation.y = startingpos.current.yr;
        yes.camera.rotation.z = startingpos.current.zr;
    }, []);

    var paths = [
        {
            flex: 1,
            x: 0,
            y: 0,
            z: 1400,
            xr: 0.2,
            yr: -0.7,
            zr: 0,
        },
        //about me
        //make it go through the 0 in about me and have a more miniature world.
        {
            flex: 20,
            x: 0,
            y: 0,
            z: 0,
            xr: 0,
            yr: 0,
            zr: 0,
        },
    ];

    useFrame((state, delta) => {
        //get divisions of time
        var divisions = 0;
        for (var i = 0; i < paths.length; i++) {
            divisions += paths[i].flex;
        }

        //get value 0-1 for current path progress

        //get current division number based on scroll offset
        var count = Math.floor(ScrollY.offset / (1 / divisions + 0.0001));
        //find what path that number falls on
        var path = 0;
        while (count >= 0) {
            count -= paths[path].flex;
            if (count >= 0) {
                path++;
            }
        }
        currentPathRef.current = path;

        var currentpath = paths[currentPathRef.current];

        //get current path progress
        var pastdivisions = 0;
        for (var i = 0; i < currentPathRef.current; i++) {
            pastdivisions += paths[i].flex;
        }

        var currentpathprogress = ScrollY.range(
            pastdivisions / divisions,
            paths[currentPathRef.current].flex / divisions
        );

        //get previouspath
        if (currentPathRef.current == 0) {
            var previouspath = startingpos.current;
        } else {
            var previouspath = paths[currentPathRef.current - 1];
        }

        //set position based on path
        state.camera.position.x =
            previouspath.x +
            currentpathprogress * (currentpath.x - previouspath.x) +
            posx.current;
        state.camera.position.y =
            previouspath.y +
            currentpathprogress * (currentpath.y - previouspath.y) -
            posy.current;
        state.camera.position.z =
            previouspath.z +
            currentpathprogress * (currentpath.z - previouspath.z);

        //set rotation based on path
        state.camera.rotation.x =
            previouspath.xr +
            currentpathprogress * (currentpath.xr - previouspath.xr);
        state.camera.rotation.y =
            previouspath.yr +
            currentpathprogress * (currentpath.yr - previouspath.yr);
        state.camera.rotation.z =
            previouspath.zr +
            currentpathprogress * (currentpath.zr - previouspath.zr);
    });

    return <></>;
}
