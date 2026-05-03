export default function CentralTitle() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-4">
      <p className="text-[0.65rem] uppercase tracking-[0.55em] text-white/50 mb-4 font-inter">
        System Status: Optimal
      </p>
      <h1 className="font-bayon text-[clamp(4rem,14vw,9rem)] leading-none tracking-tight bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent select-none">
        Personal OS
      </h1>
    </div>
  );
}
