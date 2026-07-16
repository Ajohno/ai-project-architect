# AI Project Architect

AI Project Architect is an AI-powered web application that turns a rough software product idea into a structured project plan covering the problem, target users, MVP features, data models, backend capabilities, and development phases.

## Current milestone

This repository contains the connected starter foundation: Next.js, TypeScript, Tailwind CSS, Supabase health verification, a connection dashboard, GitHub Actions CI, and deployment-ready documentation. Groq generation, authentication, and saved-project tables are intentionally deferred.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Groq API planned through a server-only integration
- GitHub Actions CI
- Vercel deployment target

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Environment variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SUPABASE_URL` — public Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — public browser-safe key
- `GROQ_API_KEY` — private server-side secret; obtain it from Groq and never commit it

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

The runtime health endpoint is available at `/api/health`.

## Database setup

The migration in `supabase/migrations` creates only `public.health_check()`. It does not create project tables, user records, or authentication policies.

Future schema proposal, not yet applied:

- `projects`
- `project_generations`

Add those only when saved projects and authentication are designed together with ownership-based Row Level Security.

## Deployment

1. Connect this GitHub repository to the Vercel project `ai-project-architect`.
2. Add the three environment variables to Vercel for Development, Preview, and Production.
3. Deploy and verify `/api/health`.

## Provisioning report

| Step | Status | Details |
|---|---|---|
| Supabase project | CONNECTED | `AI Project Architect`, `us-east-1` |
| Database health function | CONNECTED | Migration applied and query verified |
| Authentication | NOT_REQUIRED | Deferred until saved projects |
| Groq | NOT_CONFIGURED | Add the private server key manually |
| GitHub repository | CONNECTED | Public repository created and starter source pushed |
| Vercel project | CONFIGURED | User reports project created; Git connection and environment verification remain |
| CI | CONFIGURED | Lint, type-check, and build on pushes/PRs to `main` |

## Security notes

- Never commit `.env.local`.
- Never expose the Groq server key or an elevated Supabase key to browser code.
- Public Supabase configuration is not authorization; use RLS before exposing application tables.
- CI uses placeholders and does not receive production secrets. Until `package-lock.json` exists, CI uses `npm install`; afterward it automatically uses `npm ci`.
