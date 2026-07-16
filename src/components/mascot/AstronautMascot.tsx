"use client";

import type { CSSProperties } from "react";

export type MascotState =
  | "idle"
  | "thinking"
  | "generating"
  | "success"
  | "error";

type AstronautMascotProps = {
  state?: MascotState;
  size?: number;
  label?: string;
};

export function AstronautMascot({
  state = "idle",
  size = 320,
  label = "AI astronaut assistant",
}: AstronautMascotProps) {
  return (
    <figure
      className="astronaut-mascot"
      data-state={state}
      style={{ "--mascot-size": `${size}px` } as CSSProperties}
      aria-label={`${label}: ${state}`}
    >
      <svg viewBox="0 0 360 360" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="helmet" gradientUnits="userSpaceOnUse" x1="55" y1="40" x2="305" y2="315">
            <stop offset="0%" stopColor="#64F6FF" />
            <stop offset="38%" stopColor="#3C91FF" />
            <stop offset="75%" stopColor="#7C55FF" />
            <stop offset="100%" stopColor="#D052FF" />
          </linearGradient>
          <linearGradient id="rim" gradientUnits="userSpaceOnUse" x1="75" y1="80" x2="290" y2="270">
            <stop offset="0%" stopColor="#5EFBFF" />
            <stop offset="36%" stopColor="#347BFF" />
            <stop offset="72%" stopColor="#9451FF" />
            <stop offset="100%" stopColor="#FF58CA" />
          </linearGradient>
          <radialGradient id="visor" cx="34%" cy="22%" r="95%">
            <stop offset="0%" stopColor="#202D59" />
            <stop offset="44%" stopColor="#090D22" />
            <stop offset="100%" stopColor="#02040B" />
          </radialGradient>
          <linearGradient id="reflection" gradientUnits="userSpaceOnUse" x1="90" y1="90" x2="270" y2="255">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="38%" stopColor="#8DEBFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <clipPath id="visorClip">
            <rect x="74" y="82" width="212" height="176" rx="74" />
          </clipPath>
        </defs>

        <ellipse className="mascot-shadow" cx="180" cy="318" rx="92" ry="16" fill="#0B1230" opacity="0.65" />
        <path className="ambient-glow" d="M180 35C90 35 42 97 42 177s45 139 138 139 138-59 138-139S270 35 180 35Z" fill="#3C8FFF" opacity="0.27" filter="url(#softGlow)" />

        <g className="helmet">
          <rect x="34" y="128" width="48" height="94" rx="24" fill="#162147" stroke="url(#rim)" strokeWidth="7" />
          <rect x="278" y="128" width="48" height="94" rx="24" fill="#162147" stroke="url(#rim)" strokeWidth="7" />
          <path d="M180 40c-88 0-130 55-130 135 0 83 47 131 130 131s130-48 130-131C310 95 268 40 180 40Z" fill="url(#helmet)" />
          <path d="M84 86c24-26 57-38 96-38 42 0 76 13 98 40" fill="none" stroke="#E1FCFF" strokeOpacity="0.45" strokeWidth="8" strokeLinecap="round" />
          <path d="M104 296h152l-14 31H118Z" fill="#171E45" stroke="url(#rim)" strokeWidth="5" strokeLinejoin="round" />
          <rect x="66" y="74" width="228" height="192" rx="86" fill="#0A0F23" stroke="#A8E7FF" strokeOpacity="0.42" strokeWidth="5" />
          <rect className="visor" x="74" y="82" width="212" height="176" rx="74" fill="url(#visor)" stroke="url(#rim)" strokeWidth="6" />

          <g clipPath="url(#visorClip)">
            <path d="M85 94c48-22 109-17 154 7-22 8-47 25-61 45-31-21-61-34-93-33Z" fill="url(#reflection)" />

            <g className="thinking-orbit">
              <ellipse cx="180" cy="168" rx="72" ry="43" fill="none" stroke="#69EFFF" strokeWidth="3" strokeDasharray="8 11" opacity="0.8" />
              <circle cx="249" cy="151" r="6" fill="#C75CFF" />
              <circle cx="116" cy="186" r="4" fill="#54F5FF" />
            </g>

            <g className="generating-effects">
              <path d="M84 126c58 21 133-17 196 4" fill="none" stroke="#5CEFFF" strokeWidth="4" opacity="0.78" />
              <path d="M82 164c63 22 139-18 202 5" fill="none" stroke="#8B64FF" strokeWidth="4" opacity="0.75" />
              <path d="M84 202c58 21 133-17 196 4" fill="none" stroke="#FF5CD7" strokeWidth="4" opacity="0.73" />
              <rect className="scanline" x="80" y="86" width="200" height="16" rx="8" fill="#7DF7FF" opacity="0.18" />
            </g>

            <g className="success-effects">
              <path d="m240 111 5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" fill="#FFF4A8" filter="url(#glow)" />
              <circle cx="111" cy="126" r="3.5" fill="#67F6FF" />
              <circle cx="264" cy="194" r="4.5" fill="#CA6CFF" />
            </g>

            <g className="error-effects">
              <path d="M93 111h174M99 226h162" stroke="#FF4D7C" strokeWidth="7" strokeLinecap="round" opacity="0.48" />
            </g>

            <circle cx="111" cy="109" r="2.7" fill="#92F8FF" />
            <circle cx="251" cy="211" r="2.2" fill="#B08CFF" />
            <circle cx="229" cy="112" r="1.8" fill="#FFFFFF" />
          </g>

          <g className="face face-neutral" filter="url(#glow)">
            <rect className="eye eye-left" x="126" y="144" width="22" height="44" rx="11" fill="#F7FBFF" />
            <rect className="eye eye-right" x="212" y="144" width="22" height="44" rx="11" fill="#F7FBFF" />
          </g>

          <g className="face face-success" filter="url(#glow)">
            <path d="M119 174c8-17 24-17 34 0M207 174c8-17 24-17 34 0" fill="none" stroke="#F8FCFF" strokeWidth="12" strokeLinecap="round" />
          </g>

          <g className="face face-error" filter="url(#glow)">
            <path d="m119 151 33 22m89-22-33 22" stroke="#FFE5EC" strokeWidth="12" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </figure>
  );
}
