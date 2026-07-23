import { Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ContactSearchParamsBridge from "@/components/ContactSearchParamsBridge";
import { projects } from "@/data/projects";
import { imageExists } from "@/lib/image-exists";

export default function Home() {
  const workProjects = projects.map((project) => ({
    ...project,
    thumbnailExists: imageExists(project.thumbnail),
  }));

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work projects={workProjects} />
        <Services />
        <Clients />
        <About />
        <Suspense fallback={<Contact />}>
          <ContactSearchParamsBridge />
        </Suspense>
      </main>
      <footer className="border-t border-[#e8e8e8] py-7 px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <span className="text-xs text-[#bbb]">© 2025 Eron Begiqi</span>
        <span className="text-xs text-[#bbb]">Designed & Built with care</span>
      </footer>
    </>
  );
}
