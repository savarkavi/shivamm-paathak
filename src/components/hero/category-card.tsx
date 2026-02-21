"use client";

import { cn } from "@/lib/utils";
import { useCategory } from "@/providers/category-context";
import { AnimateSvg } from "../loop-svg";

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
        "flex-1 cursor-pointer border-t border-r border-dashed border-gray-500 uppercase last:border-r-0",
        currentCategory === data.category && "bg-white text-black",
      )}
      onMouseEnter={() => setCurrentCategory(data.category)}
    >
      <div className="flex items-center justify-between border-b border-dashed border-gray-500 p-2 text-sm">
        <span>{data.id}</span>
        <span>{data.type}</span>
      </div>
      <div className="relative w-fit p-2">
        <p className="text-lg font-bold">{data.category}</p>
        {currentCategory === data.category && (
          <AnimateSvg
            width="100%"
            height="100%"
            viewBox="0 0 286 130"
            className="my-svg-animation absolute top-0 left-0 w-full"
            path="M118.044 89.6246C163.162 89.4205 222.936 90.424 262.268 64.685C273.127 57.5785 289.889 46.2541 280.644 31.5415C266.757 9.43877 226.597 6.18947 204.103 4.22275C163.951 0.712215 122.736 4.85252 83.8345 15.462C59.5841 22.0757 20.3308 33.8561 6.3903 57.3016C-30.0407 118.572 238.749 125.617 256.853 126.542"
            strokeColor="red"
            strokeWidth={3}
            strokeLinecap="round"
            animationDuration={1.5}
            animationDelay={0}
            animationBounce={0.3}
            reverseAnimation={false}
            hoverStrokeColor="#4f46e5"
          />
        )}
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
