import CategoriesContainer from "@/components/hero/categories-container";
import Header from "@/components/hero/header";
import LoadingOverlay from "@/components/hero/loading-overlay";
import ProjectGallery from "@/components/hero/project-gallery";
import { CategoryProvider } from "@/providers/category-context";

export default function Home() {
  return (
    <LoadingOverlay>
      <div className="hero-container flex h-screen w-full flex-col justify-between overflow-hidden bg-black">
        <CategoryProvider>
          <Header />
          <ProjectGallery />
          <CategoriesContainer />
        </CategoryProvider>
      </div>
    </LoadingOverlay>
  );
}
