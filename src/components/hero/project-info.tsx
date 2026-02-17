import TextAnimateWrapper from "../text-animate-wrapper";

interface ProjectInfoProps {
  project: {
    info: {
      label: string;
      value: string;
    }[];
    credits: {
      label: string;
      value: string;
    }[];
    imgSrc: string;
  };
  activeProject: number;
}

const ProjectInfo = ({ project, activeProject }: ProjectInfoProps) => {
  return (
    <div className="flex h-full max-w-50 flex-col justify-between border-l border-dashed pl-2 text-[12px] uppercase">
      <div>
        {project.info.map((info, i) => (
          <div key={i} className="flex items-center">
            <div className="absolute -left-1 h-px w-3 bg-white" />
            <TextAnimateWrapper
              key={`${i}-${activeProject}`}
              trigger={activeProject}
            >
              <p className="word-split uppercase opacity-0">
                <span className="ml-2 text-gray-400">{info.label}:</span>{" "}
                {info.value}
              </p>
            </TextAnimateWrapper>
          </div>
        ))}
      </div>
      <div>
        <TextAnimateWrapper trigger={activeProject}>
          <p className="word-split ml-2 text-gray-400 opacity-0">Credits</p>
        </TextAnimateWrapper>
        <div className="flex flex-col gap-1">
          {project.credits.map((credit, i) => (
            <div key={i} className="flex items-center">
              <div className="absolute -left-1 h-px w-3 bg-white" />
              <TextAnimateWrapper
                key={`${i}-${activeProject}`}
                trigger={activeProject}
              >
                <p className="word-split ml-2 opacity-0">
                  <span className="text-red-500">{credit.label}:</span>{" "}
                  {credit.value}
                </p>
              </TextAnimateWrapper>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <TextAnimateWrapper trigger={activeProject}>
            <p className="word-split ml-2 opacity-0">
              On{" "}
              <span className="cursor-pointer text-gray-400 underline">
                instagram
              </span>
            </p>
          </TextAnimateWrapper>
        </div>
        <div className="flex items-center">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <TextAnimateWrapper trigger={activeProject}>
            <p className="word-split ml-2 opacity-0">
              <span className="cursor-pointer text-gray-400 underline">
                Explore
              </span>{" "}
              Project
            </p>
          </TextAnimateWrapper>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
