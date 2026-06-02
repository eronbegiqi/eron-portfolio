import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Clients />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-[#e8e8e8] py-7 px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <span className="text-xs text-[#bbb]">© 2025 Eron Begiqi</span>
        <span className="text-xs text-[#bbb]">Designed & Built with care</span>
      </footer>
    </>
  );
}
