import Image from "next/image";
import Hero from "./components/Hero";
import AboutMe from "./sections/About";


export default function Home() {
  return (
    <main className='h-full w-full'>
      <div className='flex flex-col gap-20 h-fit'>
        <Hero />
        <AboutMe />
        
      </div>
      
    </main>
  );
}
