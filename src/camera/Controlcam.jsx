import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Controlcam() {
    var posx = useRef();
    var posy = useRef();
    var countref = useRef(0);
    var currentPathRef = useRef(0);
    var translateamount = useRef();
    var startingpos = useRef({
        x: -500,
        y: -200,
        z: 2000,
        xr: 0,
        yr: 0,
        zr: 0,
        ta: 8,
    });

    var yes = useThree();

    var ScrollY = useScroll();

    useEffect(() => {
        //control camera
        window.addEventListener("mousemove", (e) => {
            if (countref.current > 10) {
                posx.current =
                    (e.clientX / window.innerWidth) * translateamount.current -
                    translateamount.current / 2;
                posy.current =
                    (e.clientY / window.innerHeight) * translateamount.current -
                    translateamount.current / 2;
            }
        });
        //initialize camera
        yes.camera.position.x = startingpos.current.x;
        yes.camera.position.y = startingpos.current.y;
        yes.camera.position.z = startingpos.current.z;
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
            ta: 8,
        },
        //about me
        {
            flex: 5,
            x: 28,
            y: 10,
            z: 1357,
            xr: 0.2,
            yr: -0.5,
            zr: 0,
            ta: 0.2,
        },
        //in 0
        {
            flex: 2,
            x: 29,
            y: 10.6,
            z: 1356,
            xr: -0.1,
            yr: 1,
            zr: 0.42,
            ta: 0.2,
        },
        //end of timeliine scroll
        {
            flex: 3,
            x: 34,
            y: 14.3,
            z: 1348,
            xr: -0.1,
            yr: 1,
            zr: 0.44,
            ta: 0.2,
        },
        {
            flex: 20,
            x: 0,
            y: 0,
            z: -20,
            xr: 0,
            yr: 0,
            zr: 0,
            ta: 8,
        },
    ];

    useFrame((state, delta) => {
        //console.log
        /* console.log("x: " + state.camera.position.x);
        console.log("y: " + state.camera.position.y);
        console.log("z: " + state.camera.position.z);*/

        //count up -- this is because of weird loading of html
        if (countref.current < 100) {
            countref.current++;
        }
        if (countref.current > 10 && countref.current < 15) {
            posx.current = 0;
            posy.current = 0;
        }

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

        //set translate amount
        translateamount.current = currentpath.ta;

        //set position based on path

        state.camera.position.x =
            previouspath.x +
            currentpathprogress * (currentpath.x - previouspath.x) +
            posx.current;
        i;
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
