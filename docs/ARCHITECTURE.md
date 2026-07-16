# Architecture

```mermaid
flowchart TD
  U[User] --> N[Next.js application]
  N --> H[Server-side health endpoint]
  H --> S[Supabase API]
  S --> P[(PostgreSQL)]
  N --> G[Future server-side Groq generation endpoint]
  G --> A[Groq API]
  GH[GitHub repository] --> CI[GitHub Actions CI]
  GH --> V[Vercel deployments]
  V --> N
```

## Trust boundaries

- The browser receives only public Supabase configuration.
- The Groq API key remains server-side and is never prefixed with `NEXT_PUBLIC_`.
- The health endpoint returns sanitized statuses, never secret values.
- Supabase currently exposes only a non-sensitive `health_check()` RPC.
- Authentication and user-owned application data are deferred to a later milestone.
