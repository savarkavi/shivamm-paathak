"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ReactNode, useRef } from "react";

interface TextAnimateWrapperProps {
  children: ReactNode;
  trigger?: unknown;
}

gsap.registerPlugin(useGSAP, SplitText);

const TextAnimateWrapper = ({ children, trigger }: TextAnimateWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(containerRef.current, {
      type: "words",
    });

    gsap.set(".word-split", {
      opacity: 1,
    });

    gsap.set(split.words, {
      display: "absolute",
      top: 50,
    });

    split.words?.forEach((word) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";
      wrapper.style.verticalAlign = "bottom";
      wrapper.style.verticalAlign = "bottom";

      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    gsap.to(split.words, {
      top: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    return () => {
      split.revert();
    };
  }, [trigger]);

  return <div ref={containerRef}>{children}</div>;
};

export default TextAnimateWrapper;
