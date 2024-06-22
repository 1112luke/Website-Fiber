import { motion } from "framer-motion";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Button({ text, scrollamount, scrollDat }) {
    var scrollpos = useRef(scrollamount);

    useEffect(() => {
        if (scrollDat) {
            scrollpos.current = scrollamount * scrollDat.el.scrollHeight;
        }
    }, []);

    return (
        <motion.div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => {
                scrollDat.el.scrollTo(0, scrollpos.current);
            }}
            id="button"
        >
            <div style={{ color: "orange", fontSize: "25px" }}>{text}</div>
        </motion.div>
    );
}
