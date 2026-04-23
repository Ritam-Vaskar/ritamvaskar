import ProjectsPage from "../sections/Project";

export const metadata = {
  title: "Projects | Ritam Vaskar",
  description: "Browse Ritam Vaskar's portfolio of web development projects.",
};

export default function ProjectsRoute() {
  return (
    <main className="min-h-screen pt-[60px]">
      <ProjectsPage />
    </main>
  );
}
