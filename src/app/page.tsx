import Hero from "@/components/home/Hero";
import ActiveBentoGrid from "@/components/home/ActiveBentoGrid";
import LogicPhilosophy from "@/components/home/LogicPhilosophy";
import StackArchitecture from "@/components/home/StackArchitecture";
import { GithubSection } from "@/components/home/GithubSection";
import CertificationVault from "@/components/home/CertfificationVault";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentBlogs from "@/components/home/RecentBlogs";
export default function Page() {
  return (
    <main>
      <Hero />
      <ActiveBentoGrid />
      <FeaturedProjects />
      <LogicPhilosophy />
      <RecentBlogs />
      <GithubSection />
      <StackArchitecture />
      <CertificationVault />
    </main>
  );
}
