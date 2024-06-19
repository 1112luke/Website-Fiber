import { Vector3 } from "three";
import { Books } from "./Books";
import { Microphone } from "./Microphone";
import { useEffect, useRef, useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import Webplane from "../../Webplane";
import { FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { CiStreamOn } from "react-icons/ci";
import { useSpring } from "framer-motion";
import { motion } from "framer-motion";
import "../../App.css";

export default function Calcstack({ name, focuseditem }) {
    var rotation = useRef(new Vector3());

    var [infocus, setinfocus] = useState(false);

    var [views, setviews] = useState(0);

    var opacity = useSpring(0);

    var opacitytarget = useRef(0);

    useEffect(() => {
        opacity.set(opacitytarget.current);
    }, [opacitytarget.current]);

    useEffect(() => {
        //fetch once
        fetchVideos();
        //fetch every 5 seconds
        var vidint = setInterval(() => {
            fetchVideos();
        }, 20000);

        var liveint = setInterval(() => {
            if (opacitytarget.current == 0) {
                opacitytarget.current = 1;
            } else if (opacitytarget.current == 1) {
                opacitytarget.current = 0;
            }
        }, 2000);

        return () => {
            clearInterval(vidint);
            clearInterval(liveint);
        };
    }, []);

    async function fetchVideos() {
        try {
            var response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCpxcYLYikMPwymEGMcg-Gaz06hALanpHM&part=statistics&id=z6PXviT86tI`,
                {
                    method: "GET",
                }
            );
        } catch (error) {
            console.log(error);
        }

        response = await response.json();

        setviews(response.items[0].statistics.viewCount);
        console.log("fetching");
    }

    useEffect(() => {
        if (focuseditem == name) {
            setinfocus(true);
        } else {
            setinfocus(false);
        }
    }, [focuseditem]);

    return (
        <group
            scale={[0.1, 0.1, 0.1]}
            position={infocus ? [8, 0, 0] : [0, 0, 0]}
        >
            <group name={name}>
                {infocus && (
                    <group position={[-2.5, 0.7, 0]}>
                        <Webplane
                            width={1920}
                            height={1080}
                            distanceFactor={0.7}
                            inner={
                                <div
                                    style={{
                                        backgroundColor: "black",
                                        color: "red",
                                        fontSize: "200px",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "1920px",
                                            height: "1080px",
                                            margin: "0px",
                                            padding: "0px",
                                            display: "block",
                                        }}
                                    >
                                        <iframe
                                            src="https://www.youtube.com/embed/z6PXviT86tI?autoplay=1"
                                            width={1920}
                                            height={1080}
                                            style={{
                                                margin: "0px",
                                                padding: "0px",
                                                display: "block",
                                            }}
                                        ></iframe>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "30%",
                                                backgroundColor: "black",
                                                borderBottomLeftRadius: "40px",
                                                borderBottomRightRadius: "40px",
                                                borderRight: "5px solid orange",
                                                borderBottom:
                                                    "5px solid orange",
                                                borderLeft: "5px solid orange",
                                                display: "flex",
                                                flex: 1,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    flex: 1,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flex: 0.5,
                                                        color: "black",
                                                        fontSize: "80px",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        height: "80%",

                                                        zIndex: "2",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        borderRadius: "20px",
                                                        display: "flex",
                                                        color: "orange",
                                                    }}
                                                >
                                                    <div style={{ flex: 5 }}>
                                                        <motion.div
                                                            style={{
                                                                height: "200px",
                                                                width: "100%",

                                                                color: "red",
                                                                fontSize:
                                                                    "200px",
                                                                opacity:
                                                                    opacity,
                                                            }}
                                                        >
                                                            <CiStreamOn></CiStreamOn>
                                                        </motion.div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <IoIosEye></IoIosEye>
                                                    </div>
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            display: "block",
                                                        }}
                                                    >
                                                        <h4 style={{ flex: 1 }}>
                                                            {views}
                                                        </h4>
                                                        <h3
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                bottom: "-330px",
                                                                left: "620px",
                                                                fontSize:
                                                                    "30px",
                                                                flex: "",
                                                                color: "white",
                                                            }}
                                                        >
                                                            *live viewcount
                                                            implemented using{" "}
                                                            <a
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "orange",
                                                                }}
                                                                href="https://developers.google.com/youtube/v3/getting-started"
                                                                target="_blank"
                                                            >
                                                                Youtube Data API
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        style={{
                                                            flex: 0.2,
                                                        }}
                                                    ></div>
                                                    <div style={{ flex: 5 }}>
                                                        <motion.div
                                                            style={{
                                                                height: "200px",
                                                                width: "100%",

                                                                color: "red",
                                                                fontSize:
                                                                    "200px",
                                                                opacity:
                                                                    opacity,
                                                            }}
                                                        >
                                                            <CiStreamOn></CiStreamOn>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                                <a
                                                    className="hovertext"
                                                    style={{
                                                        flex: 0.5,
                                                        color: "orange",
                                                        fontSize: "90px",
                                                        height: "90px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                    href="https://www.youtube.com/watch?v=z6PXviT86tI"
                                                    target="_blank"
                                                >
                                                    <FaExternalLinkAlt></FaExternalLinkAlt>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        ></Webplane>
                    </group>
                )}
                <Microphone></Microphone>
                <Books></Books>
            </group>
        </group>
    );
}
