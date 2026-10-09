import NavBar from "@/components/nav/NavBar";
import SocialSidebar from "@/components/nav/SocialSidebar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/nav/Footer";

// Home page - assembles every section in reading order. About, Experience,
// Projects, and Contact get added here one at a time as each gets built.
export default function Home() {
  return (
    <>
      <NavBar />
      <SocialSidebar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />        
        <Contact />
      </main>
      <SocialSidebar inline />
      <Footer />
    </>
  );
}