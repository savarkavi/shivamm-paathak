import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createRef, useRef } from "react";
import WavyImage, { WavyImageHandle } from "./wavy-image";

interface SceneProps {
  images: string[];
  activeProject: number;
}

const Scene = ({ images, activeProject }: SceneProps) => {
  const imageRefs = useRef<Array<React.RefObject<WavyImageHandle>>>([]);
  const previousProject = useRef(activeProject);

  if (imageRefs.current.length !== images.length) {
    imageRefs.current = Array(images.length)
      .fill(null)
      .map((_, i) => imageRefs.current[i] || createRef());
  }

  useGSAP(() => {
    // Initial load setup
    if (previousProject.current === activeProject) {
      const currentRef = imageRefs.current[activeProject].current;
      if (currentRef) {
        currentRef.setPositionImmediate(0);
        currentRef.animateIn();
      }
      return;
    }

    const prevIndex = previousProject.current;
    const nextIndex = activeProject;
    const prevRef = imageRefs.current[prevIndex].current;
    const nextRef = imageRefs.current[nextIndex].current;

    // --- SEQUENCING LOGIC ---
    const masterTl = gsap.timeline();

    if (prevRef) {
      // 1. Play Out Animation
      masterTl.add(prevRef.animateOut());
    }

    if (nextRef) {
      // 2. Play In Animation (starts after prev completes)
      // Note: "-=0.2" makes it start 0.2s *before* the previous ends
      // to avoid a blank screen gap, effectively feeling "sequential but connected".
      // If you want STRICT gap, remove the "-=0.2".
      masterTl.add(nextRef.animateIn(), "-=0.4");
    }

    previousProject.current = activeProject;
  }, [activeProject]);

  return (
    <group>
      {images.map((src, i) => (
        <WavyImage
          key={i}
          src={src}
          index={i}
          ref={imageRefs.current[i] as React.RefObject<WavyImageHandle>}
        />
      ))}
    </group>
  );
};

export default Scene;
