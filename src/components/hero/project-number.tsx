"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface ProjectNumberProps {
  activeProject: number;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectNumber = ({ activeProject }: ProjectNumberProps) => {
  return (
    <div className="project-number text-white">
      <p className="flex flex-col items-center gap-6 font-serif text-2xl tracking-tighter">
        <span className="flex items-end">
          <span className="inline-block text-7xl tracking-tighter">
            {`0${activeProject + 1}`} /
          </span>
          <span className="inline-block text-3xl text-red-600">05</span>
        </span>
      </p>
    </div>
  );
};

export default ProjectNumber;
