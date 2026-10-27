"use client";

import { useCallback, useId, useState, type PointerEvent } from "react";
import { ArrowUpRight, Boxes, Code2, TrendingUp, Zap } from "lucide-react";
import { JourneyWorld, type JourneyAnchor } from "@/components/journey-world";

const stages = [
  { name: "Electrical engineering", short: "Electrical", institution: "AISSMS COE", status: "Completed", x: 160, y: 420, icon: Zap },
  { name: "Software engineering", short: "Software", institution: "CapSurge", status: "Current", x: 390, y: 335, icon: Code2 },
  { name: "Computer science", short: "Computer science", institution: "JSPM University", status: "In progress", x: 610, y: 250, icon: Boxes },
  { name: "Quant development", short: "Quant development", institution: "My direction", status: "Next", x: 830, y: 165, icon: TrendingUp },
] as const;

function Cube({ x, y, size = 26 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M0 ${-size} ${size} ${-size / 2} 0 0 ${-size} ${-size / 2}Z`} fill="#f6f1f7" stroke="#b5a5ba" strokeWidth="1.2" />
    <path d={`M${-size} ${-size / 2} 0 0 0 ${size} ${-size} ${size / 2}Z`} fill="#c1acbf" />
    <path d={`M0 0 ${size} ${-size / 2} ${size} ${size / 2} 0 ${size}Z`} fill="#91748f" />
  </g>;
}

function StageObject({ index, active }: { index: number; active: boolean }) {
  if (index === 0) return <g transform="translate(0 -42)">
    <path d="M0 -79 48 -52 0 -25 -48 -52Z" fill="#e8e4ef" stroke="#a79aaf" />
    <path d="M-48 -52 0 -25 0 -6 -48 -33Z" fill="#a99ab1" /><path d="M0 -25 48 -52 48 -33 0 -6Z" fill="#c0b4c9" />
    <path d="M0 -66 25 -52 0 -38 -25 -52Z" fill="#faf8fc" stroke="#907b9a" />
    <g stroke="#846c8e" strokeWidth="2" strokeLinecap="round"><path d="M-54 -48 -67 -41M-54 -37 -67 -30M54 -48 67 -41M54 -37 67 -30M-14 -79V-90M0 -86V-98M14 -79V-90M-14 -13V0M0 -5V8M14 -13V0" /></g>
    <path d="m3 -61 -14 11 11 5 -3 11 15 -12 -11 -4Z" fill="#93708a" />
  </g>;
  if (index === 1) return <g>
    <path d="M-49 -119 31 -136 53 -57 -27 -40Z" fill="#674763" stroke="#c1a5bf" strokeWidth="2" />
    <path d="M-43 -112 27 -127 45 -64 -24 -49Z" fill="#f4eff8" />
    <path d="m-23 -94 -9 12 13 7m24 -23 13 7 -9 12m-13 -24 -7 31" fill="none" stroke="#81557a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 -46 5 -18M-17 -9 5 -18 29 -7 7 2Z" fill="none" stroke={active ? "#faf4ff" : "#735470"} strokeWidth="3" strokeLinejoin="round" />
    <path d="M48 -124 56 -115M57 -133 69 -131M47 -141 49 -152" stroke="#c49c81" strokeWidth="2" strokeLinecap="round" />
  </g>;
  if (index === 2) return <g><Cube x={-27} y={-48} /><Cube x={27} y={-48} /><Cube x={0} y={-75} /><Cube x={0} y={-127} size={21} /></g>;
  return <g>
    <path d="M-50 -119 36 -136 53 -55 -33 -38Z" fill="#f9f6fb" stroke="#bca7bf" strokeWidth="1.5" />
    <path d="m-32 -102 10 45m-10 -9 63 -14M-27 -86 26 -97" stroke="#d7cbdc" />
    <path d="m-25 -77 16 -6 13 3 11 -21 18 -14" fill="none" stroke="#956a86" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="33" cy="-115" r="4" fill="#b68b70" />
    <path d="m-14 -43 5 28m-22 8 22 -8L15 -4 -8 4Z" fill="none" stroke="#b3a3bb" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="62" cy="-153" r="12" fill="#f4e8df" /><path d="m58 -153 3 3 5 -6" stroke="#ab7e60" fill="none" strokeWidth="1.5" />
  </g>;
}

export function JourneyScene() {
  const [selected, setSelected] = useState(1);
  const [anchors, setAnchors] = useState<JourneyAnchor[] | null>(null);
  const onRender = useCallback((positions: JourneyAnchor[] | null) => setAnchors(positions), []);
  const selectStage = useCallback((index: number) => setSelected(index), []);
  const gradient = useId().replace(/:/g, "");

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - bounds.top) / bounds.height - .5) * -3}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - .5) * 4}deg`);
  }
  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return <section className="journey" aria-label="My journey from engineering toward quantitative development">
    <div className="journey-heading"><span>My path so far</span><span>Explore a chapter <ArrowUpRight aria-hidden="true" /></span></div>
    <div className={`journey-canvas${anchors ? " has-webgl" : ""}`} data-renderer={anchors ? "webgl" : "static"} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <JourneyWorld selected={selected} onRender={onRender} onSelect={selectStage} />
      <svg className="journey-world" viewBox="0 0 1000 640" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${gradient}-top`} x1="-80" y1="-50" x2="80" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#a281a1" /><stop offset="1" stopColor="#74516f" /></linearGradient>
          <linearGradient id={`${gradient}-pale`} x1="-80" y1="-50" x2="80" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#e7e3ef" /></linearGradient>
          <radialGradient id={`${gradient}-floor`}><stop stopColor="#dcd7e6" stopOpacity=".65" /><stop offset="1" stopColor="#e9e6ef" stopOpacity="0" /></radialGradient>
          <pattern id={`${gradient}-grid`} width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .45 -1 .45 500 130)"><path d="M48 0H0V48" stroke="#d5d1df" strokeWidth=".7" /></pattern>
          <radialGradient id={`${gradient}-mask`}><stop stopColor="white" /><stop offset="1" /></radialGradient>
          <mask id={`${gradient}-fade`}><ellipse cx="500" cy="385" rx="500" ry="220" fill={`url(#${gradient}-mask)`} /></mask>
        </defs>
        <ellipse cx="500" cy="370" rx="495" ry="230" fill={`url(#${gradient}-floor)`} />
        <rect width="1000" height="640" fill={`url(#${gradient}-grid)`} mask={`url(#${gradient}-fade)`} />
        <path d="M160 450C260 450 294 365 390 365S518 280 610 280" stroke="#c5b5c3" strokeWidth="9" />
        <path d="M160 445C260 445 294 360 390 360S518 275 610 275" stroke="#ede3e9" strokeWidth="5" />
        <path d="M610 275C710 275 734 190 830 190" stroke="#c2a68f" strokeWidth="3" strokeDasharray="5 9" strokeLinecap="round" />
        {stages.map((item, index) => <g key={item.name} transform={`translate(${item.x} ${item.y})`} className={`journey-island${selected === index ? " is-selected" : ""}`}>
          <ellipse cx="0" cy="76" rx="103" ry="25" fill="#b5aabb" opacity={selected === index ? ".3" : ".16"} />
          <g className="journey-island-content">
            <path d="M-104 0 0 53V77L-104 24Z" fill={selected === index ? "#60445f" : "#c5bfce"} />
            <path d="M0 53 104 0V24L0 77Z" fill={selected === index ? "#7e607e" : "#d4cedd"} />
            <path d="M0 -53 104 0 0 53 -104 0Z" fill={`url(#${gradient}-${selected === index ? "top" : "pale"})`} stroke={selected === index ? "#b39ab4" : "#d3cbdb"} strokeWidth="1.2" strokeDasharray={index === 3 ? "4 4" : undefined} />
            <path d="M0 -43 84 0 0 43 -84 0Z" stroke={selected === index ? "#c7adca" : "#dbd3e2"} opacity=".65" />
            <StageObject index={index} active={selected === index} />
          </g>
        </g>)}
      </svg>
    </div>
      <div className="journey-stage-picker" aria-label="Choose a journey stage">
        {stages.map((item, index) => <button type="button" key={item.name} className="journey-stage" aria-label={`${item.name}, ${item.status}`} aria-pressed={selected === index} onClick={() => setSelected(index)} onFocus={() => setSelected(index)}>
          <span className="journey-stage-label"><span className="journey-stage-name"><span className="journey-stage-number">0{index + 1}</span>{item.short}</span><span className="journey-stage-caption">{item.institution} · {item.status}</span></span>
        </button>)}
      </div>
    <div className="journey-mobile-stages" aria-label="Journey chapters">
      {stages.map((item, index) => <button type="button" key={item.name} className="journey-mobile-stage" aria-pressed={selected === index} onClick={() => setSelected(index)} onFocus={() => setSelected(index)}>
        <span className="journey-mini-island" aria-hidden="true"><item.icon /></span>
        <span className="journey-mobile-label"><span className="journey-stage-number">0{index + 1}</span><strong>{item.name}</strong><span>{item.institution}</span></span>
        <span className="journey-mobile-status">{item.status}</span>
      </button>)}
    </div>
  </section>;
}
