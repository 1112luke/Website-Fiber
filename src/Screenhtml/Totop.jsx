import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Totop() {
    var ScrollY = useScroll();
    var arrowref = useRef();
    var wordsref = useRef();
    var [vis, setvis] = useState();

    useFrame(() => {
        setvis(ScrollY.visible(1 / 40, 1));
    });
    //#306991

    const words = {
        initial: { color: "rgba(255,255,255,0.3)" },
        after: {
            scale: 1.1,
            y: "10px ",
            color: "#ffbc03",
            transition: { type: "spring", stiffness: 500, damping: 15 },
        },
    };
    const arrow = {
        initial: { opacity: 0, color: "rgba(255,255,255,0.3)" },
        after: {
            opacity: 1,
            y: "-10px",
            color: "#ffbc03",
            transition: { type: "spring", stiffness: 600, damping: 15 },
        },
    };

    function onpress() {
        ScrollY.el.scrollTo(0, 0);
    }

    return (
        //add arror that fades in with opacity at specified intervals in this file or in any other
        <Html>
            {vis && (
                <motion.div
                    style={{
                        position: "fixed",
                        top: `${window.innerWidth * 0.01}px`,
                        left: `50%`,
                        width: `${window.innerWidth * 0.15}px`,
                        height: `${window.innerWidth * 0.04}px`,
                        marginLeft: `-${(window.innerWidth * 0.15) / 2}px`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={onpress}
                    initial="initial"
                    animate="initial"
                    whileHover="after"
                >
                    <motion.div
                        style={{
                            fontSize: 17,
                        }}
                        variants={words}
                        ref={wordsref}
                    >
                        Scroll to Top
                    </motion.div>

                    <motion.div
                        style={{ position: "absolute" }}
                        variants={arrow}
                        ref={arrowref}
                    >
                        <FaArrowUp></FaArrowUp>
                    </motion.div>
                </motion.div>
            )}
        </Html>
    );
}
