"use client"
import dynamic from "next/dynamic";
import { GithubSkeleton, PhilosophySkeleton, StackSkeleton } from "./Skelton";

export const LogicPhilosophy = dynamic(
  () => import("@/components/home/LogicPhilosophy"),
  {
    ssr: false,
    loading: () => <PhilosophySkeleton />,
  },
);

export const GithubSection = dynamic(
  () =>import("@/components/home/GithubSection").then((mod)=>mod.GithubSection),
  {
    ssr: false,
    loading: () => <GithubSkeleton/>,
  },
);

export const StackArchitecture = dynamic(
  () => import("@/components/home/StackArchitecture"),
  {
    ssr: false,
    loading: () => <StackSkeleton />,
  },
);