import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import ActiveBentoGrid from "@/components/home/ActiveBentoGrid";
import { ProjectSkeleton } from "@/components/home/Skelton";
import BlogsLoading from "@/components/admin/SuspenseBlog";
import CertsLoading from "@/components/admin/SuspenseCertificates";
import {
  LogicPhilosophy,
  GithubSection,
  StackArchitecture
} from "@/components/home/DynamicClientComponont";
import { getPublicSkillsByCategory } from "@/dal/tech.dal";


const FeaturedProjects = dynamic(() =>import( "@/components/home/FeaturedProjects"),{
  ssr:true,
  loading:()=><ProjectSkeleton/>
});
const FooterCTA = dynamic(() => import("@/components/home/FooterCTA"), {
  ssr: true,
  loading: () => <ProjectSkeleton />,
});

const RecentBlogs = dynamic(() => import("@/components/home/RecentBlogs"),{
  ssr:true,
  loading:()=><BlogsLoading />
});

const CertificationVault = dynamic(
  () => import("@/components/home/CertfificationVault"),
  {
    ssr: true,
    loading: () => <CertsLoading />,
  },
);


export default async function Page() {
  const techData = await getPublicSkillsByCategory();
  return (
    <main>
      <Hero />
      <ActiveBentoGrid />
      <FeaturedProjects />
      <LogicPhilosophy />
      <RecentBlogs />
      <StackArchitecture data={techData} />
      <GithubSection />
      <CertificationVault />
      <FooterCTA/>
    </main>
  );
}
