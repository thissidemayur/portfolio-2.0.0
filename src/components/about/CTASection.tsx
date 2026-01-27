// app/about/CTASection.tsx
export default function CTASection() {
  return (
    <section className="p-16 bg-white/[0.02] border border-white/5 rounded-[3.5rem] text-center">
      <h2 className="text-4xl font-black uppercase italic mb-6">
        Professional Cooperation
      </h2>
      <button className="px-10 py-4 bg-white text-black font-black uppercase text-xs rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
        Initiate Contact
      </button>
    </section>
  );
}
