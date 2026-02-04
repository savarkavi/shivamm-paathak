import { categoriesData } from "@/lib/constants";
import CategoryCard from "./category-card";

const CategoriesContainer = () => {
  return (
    <div className="flex w-full">
      {categoriesData.map((item) => (
        <CategoryCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default CategoriesContainer;
