import { featuredProjectsData } from "@/lib/constants";
import ProjectCard from "./project-card";

const FeaturedProjects = () => {
  return (
    <div className="flex w-full">
      {featuredProjectsData.map((item) => (
        <ProjectCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default FeaturedProjects;
