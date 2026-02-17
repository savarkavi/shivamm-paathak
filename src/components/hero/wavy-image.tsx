import { useTexture } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uBend;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Existing wave bend
    float frequency = 3.0;
    float wave = sin(pos.y * frequency - uTime * 4.0) * (uBend * 0.3);
    pos.z += wave;

    // Hover: radial bulge displacement around cursor
    float dist = distance(uv, uMouse);
    float radius = 0.35;
    float bulgeStrength = 0.6;
    float bulge = smoothstep(radius, 0.0, dist) * bulgeStrength * uHover;
    pos.z += bulge;

    // Subtle ripple ring around cursor on hover
    float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * uHover * smoothstep(radius + 0.1, radius * 0.5, dist);
    pos.z += ripple;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    // Chromatic aberration: offset R and B channels away from cursor
    vec2 dir = vUv - uMouse;
    float dist = length(dir);
    float radius = 0.35;
    float strength = smoothstep(radius, 0.0, dist) * uHover * 0.015;
    vec2 offset = normalize(dir + 0.001) * strength;

    float r = texture2D(uTexture, vUv + offset).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - offset).b;
    float a = texture2D(uTexture, vUv).a;

    gl_FragColor = vec4(r, g, b, a * uOpacity);
  }
`;

interface WavyImageProps {
  src: string;
  index: number;
}

// Update Interface: functions now return gsap.core.Timeline
export interface WavyImageHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
  setPositionImmediate: (y: number) => void;
}

const WavyImage = forwardRef<WavyImageHandle, WavyImageProps>(
  ({ src }, ref) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const texture = useTexture(src);
    texture.minFilter = THREE.LinearFilter;

    const uniforms = useRef({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uBend: { value: 0 },
      uOpacity: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    });

    useFrame((state, delta) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += delta;
      }
    });

    // Hover handlers
    const handlePointerOver = useCallback(() => {
      if (!materialRef.current) return;
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, []);

    const handlePointerOut = useCallback(() => {
      if (!materialRef.current) return;
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }, []);

    const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
      if (!materialRef.current || !e.uv) return;
      materialRef.current.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
    }, []);

    useImperativeHandle(ref, () => ({
      setPositionImmediate: (y: number) => {
        if (!meshRef.current || !materialRef.current) return;
        meshRef.current.position.y = y;
        meshRef.current.position.z = 0;
        meshRef.current.rotation.set(0, 0, 0);
        materialRef.current.uniforms.uBend.value = 0;
        materialRef.current.uniforms.uOpacity.value = 1;
      },

      animateIn: () => {
        const tl = gsap.timeline();
        if (!meshRef.current || !materialRef.current) return tl;

        // 1. Setup Initial State (Below screen)
        tl.set(meshRef.current.position, { y: -7, z: 0 })
          .set(meshRef.current.rotation, { x: 0.5, z: 0 })
          .set(materialRef.current.uniforms.uBend, { value: 2.0 });

        // 2. Animate Up
        tl.to(
          meshRef.current.position,
          {
            y: 0,
            z: 0,
            duration: 1,
            ease: "power3.out",
          },
          0,
        ); // Start at time 0

        // 3. Flatten Rotation
        tl.to(
          meshRef.current.rotation,
          {
            x: 0,
            duration: 1,
            ease: "back.out(1.2)",
          },
          0,
        );

        // 4. Fade In
        tl.to(
          materialRef.current.uniforms.uOpacity,
          {
            value: 1,
            duration: 0.4,
          },
          0,
        );

        // 5. Un-bend
        tl.fromTo(
          materialRef.current.uniforms.uBend,
          {
            value: 2,
          },
          {
            value: 0,
            duration: 1,
          },
          0,
        );

        return tl;
      },

      animateOut: () => {
        const tl = gsap.timeline();
        if (!meshRef.current || !materialRef.current) return tl;

        // 1. Move Up
        tl.to(
          meshRef.current.position,
          {
            y: 7,
            z: -2,
            duration: 1,
            ease: "power2.in",
          },
          0,
        );

        // 2. Rotate Back
        tl.to(
          meshRef.current.rotation,
          {
            x: -0.5,
            z: 0.2,
            duration: 1,
            ease: "power1.in",
          },
          0,
        );

        // 3. Fade Out
        tl.to(
          materialRef.current.uniforms.uOpacity,
          {
            value: 0,
            duration: 0.5,
          },
          0.6,
        ); // Delay fade slightly

        // 4. Increase Bend
        tl.to(
          materialRef.current.uniforms.uBend,
          {
            value: 3,
            duration: 1,
            ease: "power2.in",
          },
          0,
        );

        return tl;
      },
    }));

    return (
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[5, 6.5, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms.current}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  },
);

WavyImage.displayName = "WavyImage";
export default WavyImage;
