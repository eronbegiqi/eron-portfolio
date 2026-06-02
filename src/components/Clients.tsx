const clients = [
  "TechNexus",
  "FinanceFlow",
  "ShopSphere",
  "CloudBase",
  "BuildCo",
  "DataVault",
  "NovaSoft",
  "Parallax",
  "Meridian",
  "Orbit Labs",
];

// Duplicated for seamless infinite loop
const track = [...clients, ...clients];

export default function Clients() {
  return (
    <section className="border-t border-b border-[#e8e8e8] py-7 overflow-hidden">
      <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap will-change-transform">
        {track.map((name, i) => (
          <span
            key={i}
            data-cursor=""
            className="mx-10 text-[11px] font-medium text-[#c0c0c0] tracking-[0.2em] uppercase hover:text-[#F59E0B] transition-colors duration-200 flex-shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
