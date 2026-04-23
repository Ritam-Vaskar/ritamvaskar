import AboutMe from "./sections/About";
import Education from "./sections/Education";
import SkillsPreview from "./sections/SkillsPreview";
import ProjectsPreview from "./sections/ProjectsPreview";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";


export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-4 md:gap-6 h-fit">
        <section id="home"><AboutMe /></section>
        <section id="education"><Education /></section>
        <section id="experience"><Experience /></section>
        <section id="skills"><SkillsPreview /></section>
        <section id="project"><ProjectsPreview /></section>
        <section id="contact"><Contact /></section>
      </div>
    </main>
  );
}
