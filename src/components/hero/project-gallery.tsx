"use client";

import { categoriesData } from "@/lib/constants";
import { useCategory } from "@/providers/category-context";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useState } from "react";
import FilmStrip from "./film-strip";
import ProjectInfo from "./project-info";
import Scene from "./scene";

gsap.registerPlugin(useGSAP);

const ProjectGallery = () => {
  const [activeProject, setActiveProject] = useState(0);
  const { currentCategory } = useCategory();

  const activeCategory = useMemo(() => {
    return categoriesData.find((p) => p.category === currentCategory);
  }, [currentCategory]);

  if (!activeCategory) return null;

  const projectImages = activeCategory.projects.map((p) => p.imgSrc);

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-16">
      <div className="relative flex h-[600px] w-full items-center justify-between gap-20">
        <ProjectInfo
          activeProject={activeProject}
          project={activeCategory.projects[activeProject]}
        />

        <div className="absolute top-1/2 left-1/2 h-full w-[450px] -translate-1/2">
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
            <ambientLight intensity={1} />
            <Scene images={projectImages} activeProject={activeProject} />
          </Canvas>
        </div>

        <FilmStrip
          images={projectImages}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </div>
    </div>
  );
};

export default ProjectGallery;
