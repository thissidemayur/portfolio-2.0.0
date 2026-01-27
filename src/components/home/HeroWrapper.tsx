import Hero from "./Hero";
import HeroEffects from "./Hero.client";

export default function HeroWrapper() {
  return (
    <div className="relative">
      <Hero />
      <HeroEffects />
    </div>
  );
}
