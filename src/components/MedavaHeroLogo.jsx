import { useEffect, useMemo, useRef } from "react";

const paths = [
  "M49.289,56.93c-15.632,0 -28.244,-12.702 -28.244,-28.347c-0,-15.645 12.682,-28.347 28.314,-28.347",
  "M49.359,0.236c7.816,13.538 3.17,30.895 -10.379,38.718c-13.549,7.822 -30.89,3.19 -38.706,-10.347",
  "M0.274,28.583c7.816,-13.537 25.184,-18.169 38.733,-10.347c13.549,7.823 18.168,25.156 10.352,38.694"
];

const COLORS = [
  "#3F5F46", 
  "#6b8f73", 
  "#D47271", 
  "#5F7F66", 
  "#C28C57", 
  "#6b8672", 
  "#8A6478"  
];

const PARTICLE_COUNT = 45;

export default function MedavaHeroLogo() {
  const pathRef = useRef(null);
  const particleRefs = useRef([]);
  const trailRefs = useRef([]);

  const fullPath = useMemo(() => paths.join(" "), []);

  useEffect(() => {
    let animationFrameId;

    const start = () => {
      const path = pathRef.current;
      if (!path) return;

      let length;
      try {
        length = path.getTotalLength();
      } catch {
        return;
      }

      const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
        t: Math.random(),
        // 🐢 EVEN SLOWER PARTICLES (Cut in half again)
        speed: 0.00015 + Math.random() * 0.00015, 
        phase: Math.random() * Math.PI * 2,
        orbitFreq: 12 + Math.random() * 8,
        trail: [],
      }));

      const animate = () => {
        particles.forEach((p, i) => {
          p.t = (p.t + p.speed) % 1;

          const base = path.getPointAtLength(p.t * length);
          const ahead = path.getPointAtLength(((p.t + 0.002) % 1) * length);

          const dx = ahead.x - base.x;
          const dy = ahead.y - base.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;

          const nx = -dy / len;
          const ny = dx / len;

          const orbitAngle = p.t * Math.PI * 2 * p.orbitFreq + p.phase;
          const planarOffset = Math.cos(orbitAngle) * 0.65; 
          const zDepth = Math.sin(orbitAngle); 

          const x = base.x + nx * planarOffset;
          const y = base.y + ny * planarOffset;

          const particle = particleRefs.current[i];
          if (particle) {
            particle.setAttribute("cx", x);
            particle.setAttribute("cy", y);
            
            const dynamicRadius = 0.15 + zDepth * 0.08; 
            const dynamicOpacity = 0.5 + zDepth * 0.4;
            
            particle.setAttribute("r", Math.max(0.01, dynamicRadius));
            particle.setAttribute("opacity", dynamicOpacity);
          }

          const prev = p.trail[p.trail.length - 1];

          if (prev) {
            const dx2 = x - prev[0];
            const dy2 = y - prev[1];
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

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

          p.trail.push([x, y]);

          if (p.trail.length > 140) {
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

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    animationFrameId = requestAnimationFrame(start);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* 🌀 ULTRA-SLOW ROTATION STYLES */}
      <style>{`
        @keyframes ultra-slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <svg
        viewBox="-10 -12 70 80"
        className="w-full h-full block"
        // Applying the spin animation directly to the SVG (120s = 2 minutes per full rotation)
        style={{ 
          overflow: "visible",
          animation: "ultra-slow-spin 120s linear infinite" 
        }}
        fill="none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          ref={pathRef}
          d={fullPath}
          stroke="#8BCB7D"
          strokeWidth="0.8"
          opacity="0.25"
          fill="none"
        />

        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <path
            key={`trail-${i}`}
            ref={(el) => (trailRefs.current[i] = el)}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth="0.35" 
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            fill="none"
            filter="url(#glow)"
          />
        ))}

        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <circle
            key={`particle-${i}`}
            ref={(el) => (particleRefs.current[i] = el)}
            fill={COLORS[i % COLORS.length]}
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
}