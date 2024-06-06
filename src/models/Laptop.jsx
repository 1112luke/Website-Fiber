/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Laptop(props) {
    const { nodes, materials } = useGLTF("/laptop/laptop.gltf");
    return (
        <group
            {...props}
            dispose={null}
            rotation={[0.5, 2.4, -0.2]}
            position={[-2, 0, 0]}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0.geometry}
                material={materials.metalDark}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_1.geometry}
                material={materials.metal}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_2.geometry}
                material={materials.metalMedium}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_1.geometry}
                material={materials.metalMedium}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_1_1.geometry}
                material={materials.metalDark}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_1_2.geometry}
                material={materials.metal}
            />
        </group>
    );
}

useGLTF.preload("/laptop/laptop.gltf");
