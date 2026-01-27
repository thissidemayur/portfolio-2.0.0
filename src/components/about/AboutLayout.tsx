
import AcademicSection from "./AcademicSection";
import CTASection from "./CTASection";
import IdentitySection from "./IdentitySection";
import ServicesSection from "./ServicesSection";

export default function AboutLayout() {
  return (
    <div className="max-w-6xl mx-auto pt-8 pb-24 px-6">
      <IdentitySection />
      <ServicesSection />
      <AcademicSection />
      <CTASection />
      <footer className="mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          Visual Assets: Icons by{" "}
          <a
            href="https://twemoji.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors underline underline-offset-4"
          >
            Twemoji
          </a>{" "}
          (CC-BY 4.0)
        </p>
      </footer>
    </div>
  );
}
