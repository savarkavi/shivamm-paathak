import FeaturedProjects from "@/components/hero/featured-projects";
import Header from "@/components/hero/header";

export default function Home() {
  return (
    <div className="flex h-dvh w-full flex-col justify-between">
      <Header />
      <FeaturedProjects />
    </div>
  );
}
