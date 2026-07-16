"use client";

import { FormEvent, useEffect, useState } from "react";
import { MascotPlayground } from "@/components/mascot/MascotPlayground";

type Status =
  | "NOT_REQUIRED"
  | "NOT_CONFIGURED"
  | "CONFIGURED"
  | "CONNECTED"
  | "FAILED"
  | "UNKNOWN";

type HealthResponse = {
  overall: Status;
  services: Record<string, Status>;
  checkedAt?: string;
};

const labels: Record<string, string> = {
  frontend: "Frontend",
  vercel: "Vercel deployment",
  supabase: "Supabase configuration",
  database: "PostgreSQL database",
  authentication: "Authentication",
  groq: "Groq AI",
};

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [idea, setIdea] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/health", { cache: "no-store" })
      .then(async (response) => response.json() as Promise<HealthResponse>)
      .then(setHealth)
      .catch(() =>
        setHealth({
          overall: "FAILED",
          services: { frontend: "CONNECTED", database: "FAILED" },
        }),
      );
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      idea.trim()
        ? "Starter interface verified. Add the Groq key and implement the generation endpoint next."
        : "Describe a software product idea first.",
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              AI Project Architect
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              Turn a rough software idea into an actionable product blueprint.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This starter establishes the secure architecture, database health
              verification, CI workflow, and deployment-ready foundation for an
              AI-guided project-planning application.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <p className="text-sm text-slate-400">Current milestone</p>
            <p className="mt-2 text-xl font-semibold">Connected foundation</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Authentication and application tables are intentionally deferred
              until saved projects are introduced.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20"
          >
            <label htmlFor="idea" className="text-lg font-semibold">
              Describe your product idea
            </label>
            <p className="mt-2 text-sm text-slate-400">
              Example: A scheduling platform that helps small clinics reduce
              missed appointments.
            </p>
            <textarea
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              rows={9}
              className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-100 outline-none transition focus:border-cyan-300"
              placeholder="I want to build..."
            />
            <button
              type="submit"
              className="mt-4 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Generate project blueprint
            </button>
            {message ? (
              <p className="mt-4 rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-slate-300">
                {message}
              </p>
            ) : null}
          </form>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Connection dashboard</p>
                <h2 className="mt-1 text-2xl font-semibold">Stack health</h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold">
                {health?.overall ?? "UNKNOWN"}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {Object.entries(
                health?.services ?? {
                  frontend: "CONNECTED",
                  vercel: "UNKNOWN",
                  supabase: "UNKNOWN",
                  database: "UNKNOWN",
                  authentication: "NOT_REQUIRED",
                  groq: "NOT_CONFIGURED",
                },
              ).map(([service, status]) => (
                <div
                  key={service}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3"
                >
                  <span className="text-sm text-slate-300">
                    {labels[service] ?? service}
                  </span>
                  <span className="text-xs font-bold tracking-wide text-cyan-300">
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              This endpoint reports configuration and connectivity states only.
              It never returns environment-variable values.
            </p>
          </aside>
        </section>

        <MascotPlayground />
      </section>
    </main>
  );
}
