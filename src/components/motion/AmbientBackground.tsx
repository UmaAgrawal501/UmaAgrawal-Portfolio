"use client";

const PARTICLES = [
  { left: "12%", top: "22%", duration: "5s", delay: "0s" },
  { left: "28%", top: "68%", duration: "6.4s", delay: "0.4s" },
  { left: "44%", top: "14%", duration: "5.6s", delay: "0.8s" },
  { left: "61%", top: "74%", duration: "7s", delay: "1.2s" },
  { left: "76%", top: "30%", duration: "6s", delay: "1.6s" },
  { left: "88%", top: "60%", duration: "5.2s", delay: "2s" },
  { left: "20%", top: "88%", duration: "6.8s", delay: "2.4s" },
  { left: "68%", top: "46%", duration: "5.9s", delay: "2.8s" },
];

/** Fixed ambient aurora + floating particles (Hussam-style). */
export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.55] cosmos-bg mask-fade-y" />
      <div className="absolute -top-40 left-[8%] h-[42rem] w-[42rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(127,199,196,0.16),transparent_65%)] blur-2xl" />
      <div
        className="absolute top-1/3 right-[-10%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(127,199,196,0.1),transparent_65%)] blur-2xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[34rem] w-[34rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(127,199,196,0.1),transparent_65%)] blur-2xl"
        style={{ animationDelay: "-11s" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(127,199,196,0.07), transparent 55%)",
        }}
      />
      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1 w-1 animate-float rounded-full bg-accent/40"
          style={{
            left: particle.left,
            top: particle.top,
            animationDuration: particle.duration,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
