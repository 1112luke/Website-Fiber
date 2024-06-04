export default function Aboutmepage() {
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
            }}
        >
            <div
                style={{
                    width: "80%",
                    height: "95%",
                    display: "flex",
                    fontSize: 90,
                }}
            >
                {/*in this section, make links that display different faces of the cube!!!*/}
                <div>
                    I'm an{" "}
                    <a className="hovertext" href="">
                        Electrical Engineering
                    </a>{" "}
                    major at the University of Notre Dame. I am passionate about
                    code, baseball, guitar, and
                </div>
            </div>
        </div>
    );
}
