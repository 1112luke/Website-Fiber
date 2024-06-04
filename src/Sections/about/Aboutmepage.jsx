import { useRef } from "react";

export default function Aboutmepage({ spin }) {
    var scrollref = useRef();

    //scrollref.scrollTo(100);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                border: "5px solid white",
                borderRadius: "50px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "default",
            }}
        >
            <div
                style={{
                    width: "90%",
                    height: "95%",
                    display: "flex",
                    fontSize: 150,
                    overflow: "scroll",
                    scrollbarColor: "orange black",
                }}
                ref={scrollref}
            >
                {/*in this section, make links that display different faces of the cube!!!*/}
                <div>
                    I'm an{" "}
                    <a
                        className="hovertext"
                        onMouseOver={() => {
                            spin(1);
                        }}
                        onMouseLeave={() => {
                            spin(7);
                        }}
                    >
                        Electrical Engineering
                    </a>{" "}
                    major at the{" "}
                    <a
                        className="hovertext"
                        onMouseOver={() => {
                            spin(0);
                        }}
                        onMouseLeave={() => {
                            spin(7);
                        }}
                    >
                        University of Notre Dame.
                    </a>{" "}
                    I am passionate about{" "}
                    <a
                        className="hovertext"
                        onMouseOver={() => {
                            spin(2);
                        }}
                        onMouseLeave={() => {
                            spin(7);
                        }}
                    >
                        code,
                    </a>{" "}
                    <a className="hovertext" href="">
                        electronics,
                    </a>{" "}
                    <a className="hovertext" href="">
                        baseball,
                    </a>{" "}
                    and{" "}
                    <a className="hovertext" href="">
                        guitar.
                    </a>{" "}
                    <br></br>
                    <br></br>
                    <div>Scroll to see some of my projects.</div>
                </div>
            </div>
        </div>
    );
}
