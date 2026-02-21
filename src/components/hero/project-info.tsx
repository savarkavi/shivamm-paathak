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
    <TextAnimateWrapper
      trigger={activeProject}
      highlight
      className="flex h-full max-w-50 flex-col justify-between border-l border-dashed pl-2 text-[12px] uppercase"
    >
      <div className="flex flex-col gap-1">
        <p className="word-split ml-2 text-gray-400 opacity-0">Info</p>
        {project.info.map((info, i) => (
          <div key={i} className="ml-1 flex w-fit items-center font-bold">
            <div className="absolute -left-1 h-px w-3 bg-white" />
            <p className="word-split bg-white px-1 text-red-600 uppercase opacity-0">
              <span className="text-black">{info.label}:</span> {info.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="word-split ml-2 text-gray-400 opacity-0">Credits</p>
        <div className="flex flex-col gap-1">
          {project.credits.map((credit, i) => (
            <div key={i} className="ml-2 flex w-fit items-center font-bold">
              <div className="absolute -left-1 h-px w-3 bg-white" />
              <p className="word-split bg-white px-1 text-red-600 opacity-0">
                <span className="text-black">{credit.label}:</span>{" "}
                {credit.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 font-bold">
        <p className="word-split ml-2 text-gray-400 opacity-0">Links</p>
        <div className="ml-2 flex w-fit items-center">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <p className="word-split bg-white px-1 text-black opacity-0">
            On{" "}
            <span className="cursor-pointer text-red-600 underline">
              instagram
            </span>
          </p>
        </div>
        <div className="ml-2 flex w-fit items-center font-bold">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <p className="word-split bg-white px-1 text-black opacity-0">
            <span className="cursor-pointer text-red-600 underline">
              Explore
            </span>{" "}
            Project
          </p>
        </div>
      </div>
    </TextAnimateWrapper>
  );
};

export default ProjectInfo;
