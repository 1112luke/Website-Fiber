import { Html, useScroll } from "@react-three/drei";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Button from "./Button";

export default function Homescreen() {
    var [windowsize, setwindowsize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        //listen for resize to change width
        window.addEventListener("resize", (e) => {
            setwindowsize([window.innerWidth, window.innerHeight]);
        });
    }, []);

    var scrollDat = useScroll();

    return (
        <Html>
            <div
                style={{
                    width: windowsize[0],
                    height: windowsize[1],
                }}
                id="Homepage"
            >
                <div className="navigation">
                    <ul>
                        <li>
                            <Button
                                text="ABOUT"
                                scrollamount={0.049}
                                scrollDat={scrollDat}
                            ></Button>
                        </li>
                        <li>
                            <Button
                                text="PROJECTS"
                                scrollamount={0.18}
                                scrollDat={scrollDat}
                            ></Button>
                        </li>
                        <li>
                            <Button text="Connect"></Button>
                        </li>
                        <li>
                            <Button></Button>
                        </li>
                    </ul>
                </div>
                <div className="section">
                    <div style={{ color: "orange" }}>Luke Scholler</div>
                </div>
                <div style={{ color: "white" }} className="footer">
                    <div>
                        <div
                            style={{
                                float: "block",
                                width: "100%",
                                fontSize: "3vw",
                            }}
                        >
                            Scroll
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
