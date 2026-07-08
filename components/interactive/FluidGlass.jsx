/* eslint-disable react/no-unknown-property */
"use client";

// Adapted from React Bits "FluidGlass" (lens mode).
// Changes for FYN ARC Techworks:
//  - Brand background color (#10141D) instead of the demo purple.
//  - Contained: no ScrollControls / scroll hijack — it renders a single glass
//    lens that follows the cursor and refracts whatever is behind it.
//  - Renders our own text/label instead of "React Bits" + demo images.
import * as THREE from "three";
import { useRef, useState, useEffect, memo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, useGLTF, MeshTransmissionMaterial, Text, Preload } from "@react-three/drei";
import { easing } from "maath";

// #10141D → normalized RGB for three's clear color
const BRAND_HEX = 0x10141d;

export default function FluidGlass({
  lensProps = {},
  label = "FYN ARC",
  sublabel = "TECHWORKS",
  showText = true,
  textColor = "white",
  textOpacity = 1,
  showBlobs = false,
}) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <Lens modeProps={lensProps}>
        {showBlobs && <Blobs />}
        {showText && (
          <Typography
            label={label}
            sublabel={sublabel}
            color={textColor}
            opacity={textOpacity}
          />
        )}
        <Preload />
      </Lens>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = followPointer ? (pointer.y * v.height) / 2 : 0;
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(BRAND_HEX, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes[geometryKey]?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, children, ...p }) {
  return (
    <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p}>
      {children}
    </ModeWrapper>
  );
}

// Soft radial-gradient texture (white → transparent), generated on a canvas so
// the orbs fade smoothly at the edges instead of being hard-edged discs.
function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

// Colorful glowing orbs spread across the scene. The glass lens refracts them
// as it follows the cursor — this is the "colorful glow" the lens distorts.
function Blobs() {
  const group = useRef();
  const [tex] = useState(() => makeGlowTexture());
  const blobs = [
    { pos: [-1.3, 0.6, 11.5], color: "#4c6ef5", scale: 1.5 },
    { pos: [1.4, -0.4, 11.3], color: "#7048e8", scale: 1.7 },
    { pos: [0.2, 0.8, 11.6], color: "#5c7cfa", scale: 1.2 },
    { pos: [-0.7, -0.7, 11.4], color: "#3b5bdb", scale: 1.4 },
    { pos: [1.0, 0.5, 11.5], color: "#9775fa", scale: 1.1 },
    { pos: [-1.5, -0.3, 11.3], color: "#4263eb", scale: 1.2 },
  ];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.x += Math.sin(t * 0.22 + i * 1.7) * 0.0016;
      child.position.y += Math.cos(t * 0.18 + i * 2.3) * 0.0016;
    });
  });

  return (
    <group ref={group}>
      {blobs.map((b, i) => (
        <mesh key={i} position={b.pos} scale={b.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            color={b.color}
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Typography({ label, sublabel, color = "white", opacity = 1 }) {
  const DEVICE = {
    mobile: { fontSize: 0.28, gap: 0.34 },
    tablet: { fontSize: 0.5, gap: 0.58 },
    desktop: { fontSize: 0.66, gap: 0.78 },
  };
  const getDevice = () => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
  };

  const [device, setDevice] = useState(getDevice());
  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { fontSize, gap } = DEVICE[device];
  const faded = opacity < 1;

  return (
    <group position={[0, 0, 12]}>
      <Text
        position={[0, gap / 2, 0]}
        fontSize={fontSize}
        letterSpacing={-0.03}
        color={color}
        fillOpacity={opacity}
        transparent={faded}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, -gap / 2, 0]}
        fontSize={fontSize}
        letterSpacing={0.02}
        color={color}
        fillOpacity={opacity}
        transparent={faded}
        anchorX="center"
        anchorY="middle"
      >
        {sublabel}
      </Text>
    </group>
  );
}

useGLTF.preload("/assets/3d/lens.glb");
