import Image from "next/image";

const clients = [
  "/images/logos/1.svg",
  "/images/logos/2.svg",
  "/images/logos/3.svg",
  "/images/logos/4.svg",
  "/images/logos/5.svg",
  "/images/logos/6.svg",
];

export default function ClientsLogos() {
  return (
    <section className="wrapper py-10">
      <p className="text-center text-sm uppercase tracking-widest text-[var(--color-ink)]/60">Trusted by</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
        {clients.map((src, i) => (
          <div key={i} className="flex items-center justify-center">
            <Image src={src} alt="Client logo" width={120} height={40} className="opacity-70" />
          </div>
        ))}
      </div>
    </section>
  );
}
