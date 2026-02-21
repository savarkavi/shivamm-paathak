"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ReactNode, useRef } from "react";

interface TextAnimateWrapperProps {
  children: ReactNode;
  trigger?: unknown;
  highlight?: boolean;
  className?: string;
}

gsap.registerPlugin(useGSAP, SplitText);

const TextAnimateWrapper = ({
  children,
  trigger,
  highlight,
  className,
}: TextAnimateWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const split = new SplitText(containerRef.current, {
      type: "words",
    });

    const targets = containerRef.current.querySelectorAll(".word-split");

    gsap.set(targets.length > 0 ? targets : ".word-split", {
      opacity: 1,
    });

    if (highlight && targets.length > 0) {
      gsap.set(targets, { clipPath: "inset(0 100% 0 0)" });
    }

    gsap.set(split.words, {
      display: "absolute",
      top: 50,
    });

    split.words?.forEach((word) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";
      wrapper.style.verticalAlign = "bottom";

      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    const tl = gsap.timeline();

    if (highlight && targets.length > 0) {
      tl.to(targets, {
        clipPath: "inset(0 0% 0 0)",
        ease: "power2.inOut",
        stagger: 0.1,
      });
    }

    tl.to(
      split.words,
      {
        top: 0,
        duration: 1,
        ease: "power3.out",
      },
      highlight ? "-=0.2" : 0,
    );

    return () => {
      split.revert();
    };
  }, [trigger, highlight]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextAnimateWrapper;
