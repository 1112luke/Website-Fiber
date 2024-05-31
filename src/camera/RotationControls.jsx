import { useEffect } from "react";

export default function RotationControls() {
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            console.log(e);
        });
    });

    return <></>;
}
