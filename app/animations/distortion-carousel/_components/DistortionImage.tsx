"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  ThreeEvent,
} from "@react-three/fiber";
import { Mesh, ShaderMaterial, TextureLoader, Vector2 } from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform float uImageAspect;
uniform float uPlaneAspect;

vec2 coverUv(vec2 uv, float imageAspect, float planeAspect) {
  vec2 ratio = vec2(
    min(planeAspect / imageAspect, 1.0),
    min(imageAspect / planeAspect, 1.0)
  );

  return vec2(
    (uv.x - 0.5) * ratio.x + 0.5,
    (uv.y - 0.5) * ratio.y + 0.5
  );
}

void main() {
  vec2 uv = coverUv(vUv, uImageAspect, uPlaneAspect);

  vec2 toMouse = uv - uMouse;
  float dist = length(toMouse);

  vec2 dir = dist > 0.0001
    ? normalize(toMouse)
    : vec2(0.0);

  float ripple = sin(dist * 28.0 - uTime * 4.0) * 0.5 + 0.5;
  float falloff = smoothstep(0.45, 0.0, dist);
  float strength = falloff * uHover * 0.035;

  vec2 displaced = uv + dir * ripple * strength;

  float aberration = falloff * uHover * 0.01;

  float r = texture2D(uTexture, displaced + dir * aberration).r;
  float g = texture2D(uTexture, displaced).g;
  float b = texture2D(uTexture, displaced - dir * aberration).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

interface DistortionPlaneProps {
  src: string;
}

function DistortionPlane({ src }: DistortionPlaneProps) {
  const texture = useLoader(TextureLoader, src);

  const meshRef = useRef<Mesh>(null);

  const { viewport } = useThree();

  const mouseTarget = useRef(new Vector2(0.5, 0.5));
  const hoverTarget = useRef(0);
  const hoverValue = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uImageAspect: { value: 1 },
      uPlaneAspect: { value: 1 },
    }),
    [texture],
  );

  useEffect(() => {
    uniforms.uTexture.value = texture;
  }, [texture, uniforms]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport.width, viewport.height]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as ShaderMaterial;

    if (texture.image) {
      material.uniforms.uImageAspect.value =
        texture.image.width / texture.image.height;
    }

    const eased = Math.min(delta * 6, 1);

    hoverValue.current += (hoverTarget.current - hoverValue.current) * eased;

    material.uniforms.uHover.value = hoverValue.current;
    material.uniforms.uTime.value += delta;
    material.uniforms.uPlaneAspect.value = viewport.width / viewport.height;

    (material.uniforms.uMouse.value as Vector2).lerp(
      mouseTarget.current,
      Math.min(delta * 10, 1),
    );
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!e.uv) return;

    mouseTarget.current.set(e.uv.x, e.uv.y);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => (hoverTarget.current = 1)}
      onPointerLeave={() => (hoverTarget.current = 0)}
    >
      <planeGeometry args={[1, 1]} />

      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        toneMapped={false}
      />
    </mesh>
  );
}

export interface DistortionImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const DistortionImage: React.FC<DistortionImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt}
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <Suspense fallback={null}>
          <DistortionPlane src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DistortionImage;
