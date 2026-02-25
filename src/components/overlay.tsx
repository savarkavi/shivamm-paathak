"use client";

import { Archivo_Black } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

export const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

gsap.registerPlugin(useGSAP, SplitText, CustomEase);

const Overlay = () => {
  const [showAudioModal, setShowAudioModal] = useState(true);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useGSAP(() => {
    if (showAudioModal) return;

    CustomEase.create("hop", "0.85, 0, 0.15, 1");

    const tl = gsap.timeline({
      onStart: () => {
        if (audioAllowed && audioRef.current) {
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch((err) => {
            console.error("Audio playback failed:", err);
          });
        }
      },
    });

    const paragraphs = gsap.utils.toArray<HTMLElement>(".overlay-line");
    const shivammChars = gsap.utils.toArray<HTMLElement>(
      ".shivamm-paathak-char",
    );
    const allCharsToRemove: HTMLElement[] = [];

    gsap.set(".shivamm-paathak-text", { opacity: 1 });
    gsap.set(shivammChars, { visibility: "hidden" });

    paragraphs.forEach((p) => {
      const split = new SplitText(p, { type: "chars" });

      gsap.set(p, { opacity: 1 });

      gsap.set(split.chars, { visibility: "hidden" });

      tl.to(
        split.chars,
        {
          visibility: "visible",
          stagger: {
            each: 0.24,
            from: "random",
            ease: "power3.out",
          },
          ease: "none",
        },
        ">+1",
      );

      (split.chars as HTMLElement[]).forEach((char) => {
        if (!char.closest(".overlay-keep")) {
          allCharsToRemove.push(char);
        }
      });
    });

    if (allCharsToRemove.length > 0) {
      tl.to(
        allCharsToRemove,
        {
          visibility: "hidden",
          stagger: {
            amount: 3,
            from: "random",
            ease: "power2.inOut",
          },
          ease: "none",
        },
        ">+1.5",
      );

      tl.to(
        shivammChars,
        {
          visibility: "visible",
          stagger: {
            amount: 3,
            from: "random",
            ease: "power2.inOut",
          },
          ease: "none",
        },
        "<",
      );

      tl.to(".overlay-keep", { color: "red" });

      tl.to(".overlay-keep", { opacity: 0, delay: 1 }).to(
        ".shivamm-paathak-text",
        { opacity: 0, delay: 1 },
      );

      tl.to(".grainy-overlay", { opacity: 0, duration: 0.3 })
        .to(".bg-right-inner", { rotate: 180, duration: 1, ease: "hop" })
        .to(
          ".bg-left-inner",
          {
            rotate: 180,
            duration: 1,
            ease: "hop",
            onComplete: () => {
              audioRef.current?.remove();
              gsap.to(".bg-container", { visibility: "hidden" });
            },
          },
          "<",
        );
    }
  }, [showAudioModal, audioAllowed]);

  const handleChoice = (allowed: boolean) => {
    setAudioAllowed(allowed);
    setShowAudioModal(false);
  };

  return (
    <div
      className={cn(
        "bg-container pointer-events-none fixed top-0 left-0 z-99 flex h-screen w-screen items-center justify-center overflow-hidden text-5xl font-bold text-black uppercase",
        archivoBlack.className,
      )}
    >
      <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
        <div
          style={{ transformOrigin: "100% 50%" }}
          className="bg-left-inner absolute top-0 left-0 h-full w-full scale-300 rotate-0 bg-stone-950"
        />
      </div>
      <div className="absolute top-0 right-0 h-full w-1/2 overflow-hidden">
        <div
          style={{ transformOrigin: "0% 50%" }}
          className="bg-right-inner absolute top-0 left-0 h-full w-full scale-300 rotate-0 bg-stone-950"
        />
      </div>

      <div
        className="grainy-overlay absolute top-0 left-0 h-screen w-screen"
        style={{
          backgroundImage: "url('/grainy-effect.webp')",
          mixBlendMode: "hard-light",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      <audio ref={audioRef} src="/birdman-jazz_new.mp3" preload="auto" />
      {showAudioModal && (
        <div className="pointer-events-auto absolute inset-0 z-99 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex w-full max-w-md flex-col border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-8 text-4xl leading-none font-black text-black">
              ENABLE <br /> AUDITORY <br /> EXPERIENCE?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleChoice(true)}
                className="flex-1 border-4 border-black bg-[#ED2939] py-4 text-2xl font-black text-white transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                YES
              </button>
              <button
                onClick={() => handleChoice(false)}
                className="flex-1 border-4 border-black bg-white py-4 text-2xl font-black text-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overlay-text z-90 flex w-full max-w-300 flex-col gap-16 text-4xl font-bold text-red-500">
        <p className="overlay-line scale-y-120 tracking-[0.2em] opacity-0">
          All{" "}
          <span className="overlay-keep" style={{ color: "white" }}>
            photographs
          </span>{" "}
          are accurate.
        </p>
        <div className="shivamm-paathak-text flex w-full items-center justify-between text-4xl text-gray-300 opacity-0">
          {"Shivamm Paathak".split("").map((char, i) => (
            <div key={i} className="shivamm-paathak-char">
              {char}
            </div>
          ))}
        </div>
        <p className="overlay-line scale-y-120 text-right tracking-widest opacity-0">
          None of them are the{" "}
          <span className="overlay-keep" style={{ color: "white" }}>
            truth
          </span>
          .
        </p>
        <p className="overlay-line text-center text-xl opacity-0">
          (Richard Avedon)
        </p>
      </div>
    </div>
  );
};

export default Overlay;
