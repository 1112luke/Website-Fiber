/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Koyshem (https://sketchfab.com/koyshem)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/baseball-bat-2669cf86386747449611396c0409db47
Title: Baseball bat
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
    const { nodes, materials } = useGLTF("/baseball_bat/scene.gltf");
    return (
        <group {...props} dispose={null}>
            <group scale={0.05} position={[0, 0, -20]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder__0.geometry}
                    material={materials["Scene_-_Root"]}
                    position={[0, 0, 0]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/baseball_bat/scene.gltf");