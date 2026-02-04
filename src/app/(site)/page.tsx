import CategoriesContainer from "@/components/hero/categories-container";
import Header from "@/components/hero/header";
import ProjectGallery from "@/components/hero/project-gallery";
import { CategoryProvider } from "@/providers/category-context";

export default function Home() {
  return (
    <div className="flex h-dvh w-full flex-col justify-between overflow-hidden">
      <CategoryProvider>
        <Header />
        <ProjectGallery />
        <CategoriesContainer />
      </CategoryProvider>
    </div>
  );
}
