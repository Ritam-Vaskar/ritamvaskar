import Image from "next/image";
import Hero from "./components/Hero";
import AboutMe from "./sections/About";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import ProjectsPage from "./sections/Project";
import Experience from "./sections/Experience";


export default function Home() {
  return (
    <main className='h-full w-full'>
      <div className='flex flex-col gap-20 h-fit'>
        <Hero />
        <AboutMe />
        <Education/>
        <Experience/>
        <Skills/>
        <ProjectsPage/>
        <Contact/>

      </div>
      
    </main>
  );
}
