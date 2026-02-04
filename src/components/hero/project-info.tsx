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
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <div className="flex h-full max-w-50 flex-col justify-between border-l border-dashed pl-2 text-[12px] uppercase">
      <div>
        {project.info.map((info, i) => (
          <div key={i} className="flex items-center">
            <div className="absolute -left-1 h-px w-3 bg-white" />
            <p className={`uppercase`}>
              <span className="ml-2 text-gray-400">{info.label}:</span>{" "}
              {info.value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <p className="ml-2 text-gray-400">Credits</p>
        <div className="flex flex-col gap-1">
          {project.credits.map((credit, i) => (
            <div key={i} className="flex items-center">
              <div className="absolute -left-1 h-px w-3 bg-white" />
              <p className="ml-2">
                <span className="text-red-500">{credit.label}:</span>{" "}
                {credit.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <p className="ml-2">
            On{" "}
            <span className="cursor-pointer text-gray-400 underline">
              instagram
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <div className="absolute -left-1 h-px w-3 bg-white" />
          <p>
            <span className="ml-2 cursor-pointer text-gray-400 underline">
              Explore
            </span>{" "}
            Project
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
