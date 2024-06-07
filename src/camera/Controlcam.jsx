import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Controlcam({ lookatpos }) {
    var posx = useRef();
    var posy = useRef();
    var countref = useRef(0);
    var prevpathref = useRef(0);
    var currentPathRef = useRef(0);
    var translateamount = useRef();
    var mouseevent = useRef();
    var loggingcam = false;
    var logoffset = false;
    var startingpos = useRef({
        x: -65,
        y: -45,
        z: 500,
        xr: 0,
        yr: 0.3,
        zr: 0,
        ta: 8,
    });

    var yes = useThree();

    var ScrollY = useScroll();

    useEffect(() => {
        //control camera
        window.addEventListener("mousemove", (e) => {
            if (countref.current > 10) {
                mouseevent.current = e;
                mouseoffset(mouseevent.current);
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

    function mouseoffset(e) {
        if (e) {
            posx.current =
                (e.clientX / window.innerWidth) * translateamount.current -
                translateamount.current / 2;
            posy.current =
                (e.clientY / window.innerHeight) * translateamount.current -
                translateamount.current / 2;
        }
    }

    var paths = [
        {
            flex: 2,
            x: 15,
            y: -23,
            z: 346,
            xr: 0.2,
            yr: -0.7,
            zr: 0,
            ta: 5,
        },
        //slow move towards hi im lke
        {
            flex: 3,
            x: 19,
            y: -21,
            z: 340,
            xr: 0.3,
            yr: -0.7,
            zr: 0,
            ta: 0,
        },
        //rotate the rest of the way there
        {
            flex: 4,
            x: 25.6,
            y: -20,
            z: 334,
            xr: 0.3,
            yr: -0.7,
            zr: -Math.PI / 2,
            ta: 0,
        },
        //looking at cube and webplane
        {
            flex: 4,
            x: 25.6,
            y: -20,
            z: 334,
            xr: 0.3,
            yr: -0.7,
            zr: -Math.PI / 2,
            ta: 0,
        },
        //turn to look at projects
        {
            flex: 4,
            x: 35,
            y: -17.94,
            z: 326,
            xr: 0,
            yr: 0.8,
            zr: -0,
            ta: 0,
        },
        //move forward towards projects
        {
            flex: 18,
            x: 0,
            y: 0,
            z: -20,
            xr: 0,
            yr: 0.8,
            zr: 0,
            ta: 0,
        },
    ];

    useFrame((state, delta) => {
        //log cam position
        if (loggingcam) {
            console.log("x: " + state.camera.position.x);
            console.log("y: " + state.camera.position.y);
            console.log("z: " + state.camera.position.z);
        }

        //log scrolloffset
        if (logoffset) {
            console.log(ScrollY.offset);
        }

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

        //check for change in path to account for translate amount
        if (currentPathRef.current != prevpathref.current) {
            mouseoffset(mouseevent.current);
            prevpathref.current = currentPathRef.current;
        }

        //lookatpos.x == 0 indicates an item is not in focus

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

        //set rotation based on path or focused object
        if (lookatpos.x == 0) {
            state.camera.rotation.x =
                previouspath.xr +
                currentpathprogress * (currentpath.xr - previouspath.xr);
            state.camera.rotation.y =
                previouspath.yr +
                currentpathprogress * (currentpath.yr - previouspath.yr);
            state.camera.rotation.z =
                previouspath.zr +
                currentpathprogress * (currentpath.zr - previouspath.zr);
        } else {
            state.camera.lookAt(lookatpos);
        }
    });

    return <></>;
}
