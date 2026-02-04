"use client";

import { cn } from "@/lib/utils";
import { useCategory } from "@/providers/category-context";

type ProjectsType = {
  imgSrc: string;
};

interface ProjectCardProps {
  data: {
    id: string;
    category: string;
    type: string;
    totalProjects: string;
    projects: ProjectsType[];
  };
}

const CategoryCard = ({ data }: ProjectCardProps) => {
  const { currentCategory, setCurrentCategory } = useCategory();

  return (
    <div
      className={cn(
        "flex-1 cursor-default border-t border-r border-dashed border-gray-500 uppercase last:border-r-0",
        currentCategory === data.category && "bg-white text-black",
      )}
      onMouseEnter={() => setCurrentCategory(data.category)}
    >
      <div className="flex items-center justify-between border-b border-dashed border-gray-500 p-2 text-sm">
        <span>{data.id}</span>
        <span>{data.type}</span>
      </div>
      <div className="p-2">
        <p className="text-lg font-bold">{data.category}</p>
      </div>
      <div>
        <div className="mt-2 flex items-center justify-between p-2 text-sm text-gray-500">
          <p>{`${data.totalProjects} Projects`}</p>
          <p className="text-red-500 underline">more</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
