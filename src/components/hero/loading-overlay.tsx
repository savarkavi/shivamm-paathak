"use client";

import { categoriesData } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const LoadingOverlay = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const allImageUrls = useMemo(() => {
    const urls = new Set<string>();
    categoriesData.forEach((category) => {
      category.projects.forEach((project) => {
        urls.add(project.imgSrc);
      });
    });
    return Array.from(urls);
  }, []);

  useEffect(() => {
    if (allImageUrls.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loaded = 0;
    const total = allImageUrls.length;

    const onLoad = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setTimeout(() => setIsLoaded(true), 300);
      }
    };

    allImageUrls.forEach((src) => {
      const img = new window.Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
    });
  }, [allImageUrls]);

  // Animate progress bar width with GSAP
  useGSAP(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [progress]);

  // Fade-out animation with GSAP when loading completes
  useGSAP(() => {
    if (!isLoaded || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setIsHidden(true),
    });

    tl.to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        progressBarRef.current?.parentElement || null,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.1",
      );
  }, [isLoaded]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
        style={{
          pointerEvents: isLoaded ? "none" : "all",
          display: isHidden ? "none" : "flex",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <span
            ref={textRef}
            className="font-mono text-5xl font-light tracking-widest text-white"
          >
            {progress}%
          </span>
          <div className="h-px w-48 bg-white/20">
            <div ref={progressBarRef} className="h-full w-0 bg-white/80" />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default LoadingOverlay;
