import { motion } from "framer-motion";
import { useScroll } from "@react-three/drei";

export default function Button({ text, scrollamount, scrollDat }) {
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
                scrollDat.el.scrollTo(0, scrollamount);
            }}
            id="button"
        >
            <div>{text}</div>
        </motion.div>
    );
}
