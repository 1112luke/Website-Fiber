import { Html } from "@react-three/drei";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function Homescreen() {
    var [windowsize, setwindowsize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    var homeref = useRef();

    var [offset, setoffset] = useState([0, 0]);

    useEffect(() => {
        //listen for resize to change width
        window.addEventListener("resize", (e) => {
            setwindowsize([window.innerWidth, window.innerHeight]);
        });
    }, []);

    return (
        <Html
            style={{ transform: `translate(-${offset[0]}px, -${offset[1]}px)` }}
            ref={homeref}
        >
            <div
                style={{
                    width: windowsize[0],
                    height: windowsize[1],
                }}
                id="Homepage"
            >
                <div className="navigation"></div>
                <div className="section">
                    <div>Luke Scholler</div>
                </div>
                <div style={{ color: "#ffc600" }} className="footer">
                    <div>
                        <div
                            style={{
                                float: "block",
                                width: "100%",
                                fontSize: "3vw",
                            }}
                        >
                            Scroll for my Life
                        </div>
                        <FaArrowDown
                            style={{
                                display: "block",
                                width: "100%",
                                marginTop: "1vw",
                                fontSize: "20px",
                            }}
                        ></FaArrowDown>
                    </div>
                </div>
            </div>
        </Html>
    );
}
