"use client";

import type { ReactNode } from "react";
import { FormEvent, useEffect, useState } from "react";
import {
  AstronautMascot,
  type MascotState,
} from "@/components/mascot/AstronautMascot";
import { MascotPlayground } from "@/components/mascot/MascotPlayground";
import styles from "./page.module.css";

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

type FeatureCardProps = {
  title: string;
  description: string;
  badge: string;
  icon: ReactNode;
  state: MascotState;
  className: string;
  href?: string;
  onActivate: (state: MascotState) => void;
  onDeactivate: () => void;
};

const labels: Record<string, string> = {
  frontend: "Frontend",
  vercel: "Vercel deployment",
  supabase: "Supabase configuration",
  database: "PostgreSQL database",
  authentication: "Authentication",
  groq: "Groq AI",
};

const fallbackServices: Record<string, Status> = {
  frontend: "CONNECTED",
  vercel: "UNKNOWN",
  supabase: "UNKNOWN",
  database: "UNKNOWN",
  authentication: "NOT_REQUIRED",
  groq: "NOT_CONFIGURED",
};

function PlannerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4.5h14v15H5z" stroke="currentColor" strokeWidth="1.7" rx="2" />
      <path d="M8 8h8M8 12h5M8 16h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V9m5 9V5m5 13v-6m5 6V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="12" cy="12" rx="9" ry="4.8" stroke="currentColor" strokeWidth="1.7" transform="rotate(-24 12 12)" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16v13H4zM3 4h18v3H3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 11h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m7 4 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeatureCard({
  title,
  description,
  badge,
  icon,
  state,
  className,
  href,
  onActivate,
  onDeactivate,
}: FeatureCardProps) {
  const classNames = `${styles.featureCard} ${className}`;
  const contents = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardBadge}>{badge}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </>
  );

  const interactionProps = {
    onMouseEnter: () => onActivate(state),
    onMouseLeave: onDeactivate,
    onFocus: () => onActivate(state),
    onBlur: onDeactivate,
  };

  if (href) {
    return (
      <a href={href} className={classNames} {...interactionProps}>
        {contents}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      aria-disabled="true"
      title="Saved blueprints will arrive with authentication and project storage."
      {...interactionProps}
    >
      {contents}
    </button>
  );
}

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [idea, setIdea] = useState("");
  const [message, setMessage] = useState("");
  const [hubState, setHubState] = useState<MascotState>("idle");
  const [hubAnimationKey, setHubAnimationKey] = useState(0);

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

  function activateOrbit(state: MascotState) {
    setHubState(state);
    setHubAnimationKey((key) => key + 1);
  }

  function resetOrbit() {
    setHubState("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    activateOrbit(idea.trim() ? "generating" : "error");
    setMessage(
      idea.trim()
        ? "The planning interface is ready. The secure Groq generation endpoint is the next functional milestone."
        : "Describe a software product idea first.",
    );
  }

  const services = health?.services ?? fallbackServices;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#top" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span>AI Project Architect</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#how-it-works" className={styles.navLink}>How it works</a>
            <a href="#status" className={styles.navLink}>Status</a>
            <a href="#orbit-playground-title" className={styles.navLink}>Orbit lab</a>
            <a href="#planner" className={styles.navCta}>Launch planner</a>
          </div>
        </nav>

        <section id="top" className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Your AI product-planning copilot
            </span>
            <h1 className={styles.title}>
              Turn an idea into a <span className={styles.titleAccent}>buildable plan.</span>
            </h1>
            <p className={styles.subtitle}>
              Meet Orbit. Describe the software you want to create and transform a rough concept into features, architecture, data models, technical decisions, and development phases.
            </p>
            <div className={styles.heroActions}>
              <a href="#planner" className={styles.primaryButton}>
                Start planning <ArrowIcon />
              </a>
              <a href="#how-it-works" className={styles.secondaryButton}>
                Explore capabilities
              </a>
            </div>
          </div>

          <div className={styles.hub} aria-label="Orbit capability hub">
            <svg className={styles.connectorMap} viewBox="0 0 1100 610" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="connectorGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3ddcff" />
                  <stop offset="55%" stopColor="#4f8dff" />
                  <stop offset="100%" stopColor="#a75aff" />
                </linearGradient>
              </defs>
              <path className={styles.connectorPath} d="M272 165 C390 165 410 266 500 286" />
              <path className={styles.connectorPath} d="M828 165 C710 165 690 266 600 286" />
              <path className={styles.connectorPath} d="M272 455 C390 455 410 354 500 334" />
              <path className={styles.connectorPath} d="M828 455 C710 455 690 354 600 334" />
            </svg>

            <FeatureCard
              title="Plan a project"
              description="Turn a rough idea into a structured product blueprint and development roadmap."
              badge="Primary tool"
              icon={<PlannerIcon />}
              state="thinking"
              className={styles.plannerCard}
              href="#planner"
              onActivate={activateOrbit}
              onDeactivate={resetOrbit}
            />

            <FeatureCard
              title="System status"
              description="Inspect deployment, database, AI provider, and application connectivity."
              badge={health?.overall ?? "Checking"}
              icon={<StatusIcon />}
              state="generating"
              className={styles.statusCard}
              href="#status"
              onActivate={activateOrbit}
              onDeactivate={resetOrbit}
            />

            <div className={styles.orbitCore}>
              <AstronautMascot
                key={`${hubState}-${hubAnimationKey}`}
                state={hubState}
                size={390}
                label="Orbit, the AI Project Architect assistant"
              />
              <span className={styles.orbitLabel}>
                <span /> Orbit is ready
              </span>
            </div>

            <FeatureCard
              title="How Orbit works"
              description="See how prompts become features, architecture, risks, and phased action plans."
              badge="3-step flow"
              icon={<OrbitIcon />}
              state="thinking"
              className={styles.howCard}
              href="#how-it-works"
              onActivate={activateOrbit}
              onDeactivate={resetOrbit}
            />

            <FeatureCard
              title="Saved blueprints"
              description="Return to past plans, compare versions, and continue projects across sessions."
              badge="Coming soon"
              icon={<ArchiveIcon />}
              state="success"
              className={styles.savedCard}
              onActivate={activateOrbit}
              onDeactivate={resetOrbit}
            />
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>From blank page to an organized product blueprint.</h2>
            <p>
              Orbit breaks a software idea into practical decisions you can review, refine, and eventually save as a living project plan.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            <article className={`${styles.bentoCard} ${styles.bentoLarge}`}>
              <p className={styles.bentoLabel}>Blueprint preview</p>
              <h3 className={styles.bentoTitle}>One prompt. A structured project direction.</h3>
              <div className={styles.blueprintMock}>
                {[
                  ["01", "Problem and users", "Clarify who the product serves and why it matters."],
                  ["02", "MVP feature set", "Prioritize the smallest valuable release."],
                  ["03", "Technical architecture", "Map frontend, backend, data, and integrations."],
                  ["04", "Development phases", "Turn the blueprint into an actionable sequence."],
                ].map(([index, title, description]) => (
                  <div key={index} className={styles.mockRow}>
                    <span className={styles.mockIndex}>{index}</span>
                    <span className={styles.mockText}>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </span>
                    <span className={styles.mockStatus} />
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.bentoCard} ${styles.bentoMedium}`}>
              <p className={styles.bentoLabel}>Development roadmap</p>
              <h3 className={styles.bentoTitle}>Move through clear phases.</h3>
              <div className={styles.phaseTrack} aria-label="Roadmap progress preview">
                <span /><span /><span /><span /><span />
              </div>
              <p className="relative z-10 mt-6 text-sm leading-6 text-slate-400">
                Discovery, architecture, MVP build, validation, and iteration—organized around the product rather than generic advice.
              </p>
            </article>

            <article className={`${styles.bentoCard} ${styles.bentoSmall}`}>
              <p className={styles.bentoLabel}>Stack suggestions</p>
              <h3 className={styles.bentoTitle}>Technology with a reason.</h3>
              <div className={styles.techPills}>
                <span>Next.js</span><span>TypeScript</span><span>Supabase</span><span>Vercel</span><span>Groq</span>
              </div>
            </article>

            <article id="status" className={`${styles.bentoCard} ${styles.bentoWide}`}>
              <p className={styles.bentoLabel}>Live stack status</p>
              <h3 className={styles.bentoTitle}>Know what is connected before you build on it.</h3>
              <div className={styles.healthList}>
                {Object.entries(services).slice(0, 4).map(([service, status]) => (
                  <div key={service} className={styles.healthRow}>
                    <span>{labels[service] ?? service}</span>
                    <span className={styles.healthValue}>{status}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="planner" className={styles.section}>
          <div className={styles.plannerSection}>
            <form onSubmit={handleSubmit} className={styles.panel}>
              <span className={styles.eyebrow}>Planner workspace preview</span>
              <h2 className="mt-5">What do you want to build?</h2>
              <p>
                Give Orbit a plain-language description. The first functional release will return a structured project blueprint from a secure server-side AI request.
              </p>
              <label htmlFor="idea" className="sr-only">Describe your product idea</label>
              <textarea
                id="idea"
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                className={styles.textarea}
                placeholder="Example: A platform that helps independent game developers organize playtests, feedback, and bug reports..."
              />
              <button type="submit" className={`${styles.primaryButton} mt-4 border-0`}>
                Generate blueprint preview <ArrowIcon />
              </button>
              {message ? <p className={styles.message}>{message}</p> : null}
            </form>

            <aside className={styles.panel}>
              <p className={styles.bentoLabel}>What Orbit will produce</p>
              <h2 className="mt-3">A plan you can actually act on.</h2>
              <div className={styles.outputList}>
                {[
                  ["01", "Product definition", "Problem, target users, value proposition, and assumptions."],
                  ["02", "MVP scope", "Prioritized features and what should wait until later."],
                  ["03", "System design", "Suggested stack, services, data models, and integration boundaries."],
                  ["04", "Execution plan", "Phases, milestones, risks, and open questions."],
                ].map(([index, title, description]) => (
                  <div key={index} className={styles.outputItem}>
                    <span>{index}</span>
                    <span>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <MascotPlayground />
        </section>

        <footer className={styles.footer}>
          AI Project Architect · Orbit landing-page experiment on the ui-change branch
        </footer>
      </div>
    </main>
  );
}
