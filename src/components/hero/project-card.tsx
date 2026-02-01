interface ProjectCardProps {
  data: {
    id: string;
    brand: string;
    category: string;
    type: string;
    files: number;
    year: number;
  };
}

const ProjectCard = ({ data }: ProjectCardProps) => {
  return (
    <div className="flex-1 border-t border-r border-dashed border-gray-500 uppercase last:border-r-0">
      <div className="flex items-center justify-between border-b border-dashed border-gray-500 p-2 text-sm">
        <span>{data.id}</span>
        <span>{data.type}</span>
      </div>
      <div className="p-2">
        <p className="text-xl font-bold">{data.brand}</p>
        <p className="text-gray-500">{data.category}</p>
      </div>
      <div>
        <div className="mt-4 flex items-center justify-between p-2 text-sm">
          <p>{`${data.files} files`}</p>
          <p>{`(c)${data.year}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
