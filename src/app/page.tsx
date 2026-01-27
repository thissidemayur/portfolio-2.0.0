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


const FeaturedProjects = dynamic(() =>import( "@/components/home/FeaturedProjects"),{
  ssr:true,
  loading:()=><ProjectSkeleton/>
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
