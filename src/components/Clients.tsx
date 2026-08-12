const clients = [
  { name: "DealerAssist", slug: "dealerassist-logo", ext: "svg" },
  { name: "RemoteTag", slug: "remotetag-logo", ext: "svg" },
  { name: "Pakapool", slug: "pakapool-ogo", ext: "svg" },
  { name: "CryptoUnited", slug: "cryptounited-logo", ext: "svg" },
  { name: "Alpine Diagnostics", slug: "aplinediagnostics-logo", ext: "svg" },
  { name: "Third Phase", slug: "thirdphase-logo", ext: "svg" },
  { name: "Finanzsatellit", slug: "finanzsatellit-logo", ext: "svg" },
  { name: "Mizan", slug: "mizan-logo", ext: "svg" },
  { name: "Cana Therapy", slug: "canatherapy-logo", ext: "svg" },
  { name: "Attributy", slug: "attributy-logo", ext: "svg" },
  { name: "Ardellion", slug: "ardellion-logo", ext: "svg" },
  { name: "Shedzug", slug: "shedzug-logo", ext: "svg" },
  { name: "Summit Balkans", slug: "summitbalkans-logos", ext: "svg" },
  { name: "Scayan", slug: "scayan-logo", ext: "svg", noColor: true },
  { name: "Latam Gateway", slug: "latamgateway-logo", ext: "webp" },
  { name: "My Tracking Devices", slug: "mytrackingdevices-logo", ext: "webp" },
  { name: "Trackinapack", slug: "trackinapack-logo", ext: "webp" },
  { name: "Olympia Bobrun", slug: "olympiabobrun-logo", ext: "webp" },
  { name: "Adopt Animals", slug: "adoptanimals-logo", ext: "webp" },
  { name: "Pieridae", slug: "pieridae-logo", ext: "webp" },
  { name: "Coinlaunch", slug: "coinlaunch-logo", ext: "webp" },
].map((c) => ({
  ...c,
  gray: `/clients/${c.slug}-gray.${c.ext}`,
  color: c.noColor ? `/clients/${c.slug}-gray.${c.ext}` : `/clients/${c.slug}.${c.ext}`,
}));

// Duplicated for seamless infinite loop
const track = [...clients, ...clients];

export default function Clients() {
  return (
    <section className="border-t border-b border-[#e8e8e8] py-7 overflow-hidden">
      <div className="flex animate-[marquee_28s_linear_infinite] items-center will-change-transform">
        {track.map((client, i) => (
          <span
            key={i}
            data-cursor=""
            className="group relative mx-10 h-8 w-28 flex-shrink-0"
          >
            <img
              src={client.gray}
              alt={client.name}
              className="h-8 w-28 object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
            />
            <img
              src={client.color}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-8 w-28 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
