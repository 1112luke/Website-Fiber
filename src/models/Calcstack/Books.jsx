/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Books(props) {
    const { nodes, materials } = useGLTF("/books/bookstack.gltf");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0.geometry}
                material={materials.mat10}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_1.geometry}
                material={materials.mat23}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_2.geometry}
                material={materials.mat21}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_3.geometry}
                material={materials.mat4}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_4.geometry}
                material={materials.mat8}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_5.geometry}
                material={materials.mat5}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_6.geometry}
                material={materials.mat3}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_7.geometry}
                material={materials.mat17}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_8.geometry}
                material={materials.mat16}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mesh_0_9.geometry}
                material={materials.mat1}
            />
        </group>
    );
}

useGLTF.preload("/books/bookstack.gltf");
