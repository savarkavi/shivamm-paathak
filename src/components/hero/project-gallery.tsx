"use client";

import { categoriesData } from "@/lib/constants";
import { useCategory } from "@/providers/category-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMemo } from "react";
import FilmStrip from "./film-strip";
import ProjectInfo from "./project-info";

gsap.registerPlugin(useGSAP);

const ProjectGallery = () => {
  const { currentCategory } = useCategory();

  const activeCategory = useMemo(() => {
    return categoriesData.find((p) => p.category === currentCategory);
  }, [currentCategory]);

  if (!activeCategory) return;

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-16">
      <div className="relative flex h-[600px] w-full items-center justify-between gap-20">
        <ProjectInfo project={activeCategory.projects[0]} />
        <div className="absolute top-1/2 left-1/2 h-full w-[450px] -translate-1/2">
          {activeCategory.projects.map((p, index) => (
            <div key={index} className="absolute top-0 left-0 h-full w-[450px]">
              <Image
                src={p.imgSrc}
                alt="project image"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <FilmStrip images={activeCategory.projects.map((p) => p.imgSrc)} />
      </div>
    </div>
  );
};

export default ProjectGallery;
