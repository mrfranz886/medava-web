import { useEffect, useMemo, useRef } from "react";

const paths = [
  "M49.289,56.93c-15.632,0 -28.244,-12.702 -28.244,-28.347c-0,-15.645 12.682,-28.347 28.314,-28.347",
  "M49.359,0.236c7.816,13.538 3.17,30.895 -10.379,38.718c-13.549,7.822 -30.89,3.19 -38.706,-10.347",
  "M0.274,28.583c7.816,-13.537 25.184,-18.169 38.733,-10.347c13.549,7.823 18.168,25.156 10.352,38.694"
];

const COLORS = [
  "#3F5F46", // deep sage (primary)
  "#4F6F56", // muted forest sage
  "#5F7F66", // balanced mid sage
  "#2F4A36"  // dark moss green
];

export default function MedavaHeroLogo() {
  const pathRef = useRef(null);
  const particleRefs = useRef([]);
  const trailRefs = useRef([]);

  const fullPath = useMemo(() => paths.join(" "), []);

  useEffect(() => {
    const start = () => {
      const path = pathRef.current;
      if (!path) return;

      let length;

      try {
        length = path.getTotalLength();
      } catch {
        return;
      }

      const particles = Array.from({ length: 18 }).map(() => ({
        t: Math.random(),
        speed: 0.0014 + Math.random() * 0.0006,
        phase: Math.random() * Math.PI * 2,
        trail: [],
      }));

      const animate = () => {
        particles.forEach((p, i) => {

          // ⚡ CLEAN LOOP (no reset ever)
          p.t = (p.t + p.speed) % 1;

          const base = path.getPointAtLength(p.t * length);
          const ahead = path.getPointAtLength(((p.t + 0.002) % 1) * length);

          const dx = ahead.x - base.x;
          const dy = ahead.y - base.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;

          const nx = -dy / len;
          const ny = dx / len;

          const wave = Math.sin(p.t * 10 + p.phase) * 0.6;

          const x = base.x + nx * wave;
          const y = base.y + ny * wave;

          const particle = particleRefs.current[i];
          if (particle) {
            particle.setAttribute("cx", x);
            particle.setAttribute("cy", y);
          }

          // 🌊 SEAMLESS TRAIL FIX (bridge wrap jumps)
          const prev = p.trail[p.trail.length - 1];

          if (prev) {
            const dx2 = x - prev[0];
            const dy2 = y - prev[1];
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            // if a wrap jump is detected → interpolate bridge
            if (dist > 10) {
              const steps = 5;

              for (let j = 1; j < steps; j++) {
                p.trail.push([
                  prev[0] + (dx2 * j) / steps,
                  prev[1] + (dy2 * j) / steps,
                ]);
              }
            }
          }

          // push current point
          p.trail.push([x, y]);

          if (p.trail.length > 260) {
            p.trail.shift();
          }

          const d = p.trail
            .map((pt, idx) =>
              idx === 0 ? `M${pt[0]},${pt[1]}` : `L${pt[0]},${pt[1]}`
            )
            .join(" ");

          const trail = trailRefs.current[i];
          if (trail) {
            trail.setAttribute("d", d);
          }
        });

        requestAnimationFrame(animate);
      };

      animate();
    };

    requestAnimationFrame(start);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">

      <svg
        viewBox="-6 -8 62 76"
        className="w-full h-full block"
        style={{ overflow: "visible" }}
        fill="none"
      >

        {/* base path */}
        <path
          ref={pathRef}
          d={fullPath}
          stroke="#8BCB7D"
          strokeWidth="2"
          opacity="0.08"
          fill="none"
        />

        {/* trails */}
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={`trail-${i}`}
            ref={(el) => (trailRefs.current[i] = el)}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth="1.2"
            opacity="0.18"
            fill="none"
          />
        ))}

        {/* particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={`particle-${i}`}
            ref={(el) => (particleRefs.current[i] = el)}
            r="0.28"
            fill={COLORS[i % COLORS.length]}
            opacity="0.1"
          />
        ))}

      </svg>
    </div>
  );
}