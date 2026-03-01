import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ProjectNumber from "./project-number";

interface FilmStripProps {
  images: string[] | undefined;
  activeProject: number;
  setActiveProject: (idx: number) => void;
}

const filmColors = {
  base: "#9A5C39",
  dark: "#3B1F11",
  light: "#EAD0B5",
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FilmStrip = ({
  images,
  activeProject,
  setActiveProject,
}: FilmStripProps) => {
  const stripContainer = useRef<HTMLDivElement | null>(null);
  const scrollDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (scrollDebounceTimer.current) {
        clearTimeout(scrollDebounceTimer.current);
      }
    };
  }, []);

  useGSAP(() => {
    if (!stripContainer.current || !images || images.length === 0) return;

    const containerHeight = stripContainer.current.offsetHeight;
    const singleImageHeight = containerHeight / images.length;
    const maxTravelDistance = containerHeight - singleImageHeight;

    gsap.set(".strip-box", { height: singleImageHeight, opacity: 1 });

    let currentIndex = 0;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            const newIndex = Math.floor(
              gsap.utils.mapRange(0, 1, 0, images.length - 1, progress),
            );

            if (newIndex !== currentIndex) {
              currentIndex = newIndex;

              // Debounce: wait 500ms after scrolling stops before triggering animation
              if (scrollDebounceTimer.current) {
                clearTimeout(scrollDebounceTimer.current);
              }
              scrollDebounceTimer.current = setTimeout(() => {
                setActiveProject(newIndex);
              }, 500);
            }
          },
        },
      })
      .to(".strip-box", {
        y: maxTravelDistance,
        ease: "none",
      })
      .to(".project-number", { y: maxTravelDistance, ease: "none" }, "<");
  });

  if (!images) return;

  return (
    <div className="flex h-full shrink-0 gap-12">
      <ProjectNumber activeProject={activeProject} />
      <div
        ref={stripContainer}
        style={{
          background:
            "linear-gradient(to bottom, rgba(80, 45, 25, 0.9), rgba(140, 75, 40, 0.75) 20%, rgba(140, 75, 40, 0.75) 80%, rgba(80, 45, 25, 0.9))",
          borderColor: "rgba(40, 20, 10, 0.9)",
        }}
        className="relative flex h-full w-[100px] justify-between gap-1 p-1"
      >
        <div className="flex-1">
          <div className="strip-box absolute top-0 left-0 z-10 w-full border-2 border-red-500 opacity-0" />
          <div className="flex h-full flex-1 flex-col">
            {images.map((src, index) => (
              <div
                key={index}
                className={
                  "group relative h-full flex-1 shrink-0 overflow-hidden border-x-2"
                }
                style={{ borderColor: filmColors.base }}
              >
                <Image
                  src={src}
                  alt={`Frame ${index}`}
                  fill
                  className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    filter:
                      activeProject === index
                        ? ""
                        : "sepia(1) hue-rotate(-20deg) contrast(1.2) brightness(0.9)",
                  }}
                />
                <span
                  className="absolute right-2 bottom-1 font-mono text-[10px] font-bold"
                  style={{ color: filmColors.dark }}
                >
                  {index + 1}A
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
