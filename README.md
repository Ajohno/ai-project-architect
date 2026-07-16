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

1. Create the public GitHub repository `Ajohno/ai-project-architect`.
2. Push this source to the `main` branch.
3. Import the repository into the Vercel team `ajohnos-projects` with project name `ai-project-architect`.
4. Add the three environment variables to Vercel for Development, Preview, and Production.
5. Deploy and verify `/api/health`.

## Provisioning report

| Step | Status | Details |
|---|---|---|
| Supabase project | CONNECTED | `AI Project Architect`, `us-east-1` |
| Database health function | CONNECTED | Migration applied and query verified |
| Authentication | NOT_REQUIRED | Deferred until saved projects |
| Groq | NOT_CONFIGURED | Add `GROQ_API_KEY` manually |
| GitHub repository | MANUAL_ACTION_REQUIRED | Connector cannot create repositories |
| Vercel project | MANUAL_ACTION_REQUIRED | Import GitHub repository after creation |
| CI | CONFIGURED | Lint, type-check, and build on pushes/PRs to `main` |

## Security notes

- Never commit `.env.local`.
- Never expose `GROQ_API_KEY` or an elevated Supabase key to browser code.
- Public Supabase configuration is not authorization; use RLS before exposing application tables.
- CI uses placeholders and does not receive production secrets.
