"use client";

import { useState } from "react";
import {
  AstronautMascot,
  type MascotState,
} from "./AstronautMascot";

const states: Array<{
  value: MascotState;
  label: string;
  description: string;
}> = [
  {
    value: "idle",
    label: "Idle",
    description: "Calm floating and blinking while Orbit waits for an idea.",
  },
  {
    value: "thinking",
    label: "Thinking",
    description: "An orbital indicator appears while Orbit studies the prompt.",
  },
  {
    value: "generating",
    label: "Generating",
    description: "Data waves and a visor scan animate during blueprint generation.",
  },
  {
    value: "success",
    label: "Success",
    description: "Smiling eyes and a sparkle celebrate a finished blueprint.",
  },
  {
    value: "error",
    label: "Error",
    description: "Warning bands and a brief shake communicate a recoverable problem.",
  },
];

export function MascotPlayground() {
  const [state, setState] = useState<MascotState>("idle");
  const [animationKey, setAnimationKey] = useState(0);

  const selected = states.find((option) => option.value === state) ?? states[0];

  function playAnimation(nextState: MascotState) {
    setState(nextState);
    setAnimationKey((key) => key + 1);
  }

  return (
    <section
      aria-labelledby="orbit-playground-title"
      className="orbit-playground overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.035] px-6 py-10 shadow-2xl shadow-indigo-950/30 sm:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Character playground
        </p>
        <h2
          id="orbit-playground-title"
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Test Orbit&apos;s visor animations
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-400">
          Click any state below to preview how Orbit can respond during the AI
          project-planning workflow. Click the active state again to replay it.
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <AstronautMascot
          key={`${state}-${animationKey}`}
          state={state}
          size={360}
          label={`Orbit showing the ${selected.label.toLowerCase()} state`}
        />
      </div>

      <p className="mx-auto min-h-12 max-w-xl text-center text-sm leading-6 text-slate-400">
        <span className="font-semibold text-slate-200">{selected.label}:</span>{" "}
        {selected.description}
      </p>

      <div
        className="mt-6 flex flex-wrap justify-center gap-3"
        role="group"
        aria-label="Orbit animation controls"
      >
        {states.map((option) => {
          const active = state === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => playAnimation(option.value)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                active
                  ? "border-cyan-300 bg-cyan-300/15 text-cyan-100 shadow-lg shadow-cyan-950/30"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
