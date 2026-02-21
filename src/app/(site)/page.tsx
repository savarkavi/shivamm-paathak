import CategoriesContainer from "@/components/hero/categories-container";
import Header from "@/components/hero/header";
import LoadingOverlay from "@/components/hero/loading-overlay";
import ProjectGallery from "@/components/hero/project-gallery";
import { CategoryProvider } from "@/providers/category-context";

export default function Home() {
  return (
    <LoadingOverlay>
      <div>
        <div
          className="fixed top-0 left-0 z-10 h-screen w-screen"
          style={{
            backgroundImage: "url('/grainy-effect.webp')",
            mixBlendMode: "hard-light",
            opacity: 0.06,
            pointerEvents: "none",
          }}
        />
        <div className="hero-container flex h-screen w-full flex-col justify-between overflow-hidden bg-stone-950">
          <CategoryProvider>
            <Header />
            <ProjectGallery />
            <CategoriesContainer />
          </CategoryProvider>
        </div>
      </div>
    </LoadingOverlay>
  );
}
