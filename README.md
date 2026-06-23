# Copilot Studio

**Enterprise AI Copilot Builder — MVP**

> Build your own AI assistant in under 10 minutes — no code required.

Copilot Studio is a multi-tenant SaaS platform where enterprise teams create, configure, and test custom AI copilots powered by their own LLM API keys (BYOK). Users upload documents, write a system persona, pick their LLM, and get a fully working AI copilot they can test immediately inside the platform.

The MVP targets **medtech and edtech** enterprise organizations and is built with HIPAA-ready security from day one.

| | |
|---|---|
| **Version** | 1.0 — MVP |
| **Product** | Copilot Studio PaaS |
| **Target customers** | Medtech + Edtech Enterprise |
| **Stack** | React + FastAPI + Supabase |
| **Sprint length** | 12 weeks |

---

## Table of Contents

- [What We're Building](#what-were-building)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Feature Build Order](#feature-build-order)
- [Design System](#design-system)
- [Security & HIPAA Requirements](#security--hipaa-requirements)
- [Getting Started](#getting-started)
- [Daily Development Workflow](#daily-development-workflow)
- [Definition of Done](#definition-of-done)
- [Using Cursor (AI Coding Assistant)](#using-cursor-ai-coding-assistant)
- [Questions & Contact](#questions--contact)

---

## What We're Building

### The 4 MVP Screens

| Screen | Name | Purpose |
|---|---|---|
| 1 | Admin Dashboard | View all copilots, usage stats, create new |
| 2 | Copilot Builder | Configure persona, model, tools — no node canvas |
| 3 | Knowledge Base | Upload files, RAG pipeline, embedding status |
| 4 | Chat Playground | Split screen — test copilot against real queries |

### Out of Scope for MVP

- Node-based visual flow builder
- One-click deploy / Kubernetes manifest
- Embeddable chat widget or public REST API
- Stripe billing or subscription management
- Slack, email, or webhook integrations
- SSO / SAML enterprise authentication
- Multi-region or data residency configuration

---

## Tech Stack

| Layer | Technology | Why we chose it |
|---|---|---|
| Frontend | React 18 + Vite + TypeScript | Fast dev server, type safety, industry standard |
| Styling | Tailwind CSS + shadcn/ui | Custom design system, no template look |
| State | Zustand + TanStack Query | Global auth state + server data caching |
| Backend | Python 3.12 + FastAPI | Fast, async, type-hinted, great docs |
| AI Layer | LangChain | RAG pipeline + tool calling + BYOK routing |
| Database | Supabase (Postgres + pgvector) | Auth + DB + Storage + RLS in one service |
| Deployment | Docker + Hetzner VPS | Cheapest production-grade setup (~€20/mo) |
| CI/CD | GitHub Actions | Auto test + deploy on every push to main |
| Monitoring | Sentry + Grafana | Error tracking + performance metrics |
| Testing | Vitest + pytest + Playwright | Unit, integration, and E2E coverage |

---

## Architecture

Every request flows through 5 layers in sequence:

| Layer | Technology | Responsibility |
|---|---|---|
| 1 — Client | React SPA | Renders UI, captures user input, calls API |
| 2 — API | FastAPI | Auth, validation, RBAC, routing to services |
| 3 — AI | LangChain | RAG retrieval, prompt construction, LLM call, streaming |
| 4 — Data | Supabase | Postgres + pgvector + file storage + RLS |
| 5 — Infra | Docker + Hetzner | Containerised runtime, Nginx reverse proxy, CI/CD |

### How a Chat Message Flows End to End

1. User types a message in the playground — React captures input and calls `POST /api/chat`
2. FastAPI auth middleware validates the JWT, checks `org_id`, logs to `audit_logs`
3. LangChain embeds the message and queries pgvector for the top-5 similar chunks
4. LangChain builds the prompt: system persona + RAG chunks + conversation history + message
5. LangChain calls the LLM using the tenant's own API key (BYOK)
6. FastAPI streams tokens back to React via Server-Sent Events (SSE)
7. React renders the streaming response word by word and saves it to the `messages` table

---

## Database Schema

10 tables in Supabase Postgres. **Every table has Row Level Security (RLS) enabled** — users can only access rows belonging to their own organization.

| Table | Purpose |
|---|---|
| `organizations` | One row per tenant. All data scoped to `org_id`. |
| `users` | Platform users. `role` = admin or member. |
| `copilots` | Core config per copilot — persona, model, tools, status. |
| `api_keys` | BYOK keys, stored AES-256 encrypted. Admin-only access. |
| `knowledge_files` | Uploaded documents — filename, size, status, storage path. |
| `embeddings` | pgvector RAG store — one row per document chunk (1536 dims). |
| `conversations` | One row per chat session. |
| `messages` | Every chat message — role, content, tokens, latency. |
| `audit_logs` | HIPAA audit trail — every user action logged, never deleted. |
| `usage_metrics` | Daily aggregated stats per copilot for the analytics dashboard. |

> **Security rule:** RLS policies are enforced at the database level, not just in application code. Even if a backend bug exists, tenant A can never read tenant B's data. This is a HIPAA requirement and is non-negotiable.

---

## Feature Build Order

Each feature is built backend-first, then frontend. **The next feature never starts until the current one is fully reviewed and signed off.**

| # | Feature | Backend | Frontend | Goal |
|---|---|---|---|---|
| F1 | Auth & Foundation | Weeks 1–2 | Week 2 | Login, signup, app shell, RLS, audit logs |
| F2 | Admin Dashboard | Week 3 | Week 3 | Copilot CRUD, usage metrics, org management |
| F3 | Copilot Builder | Weeks 4–5 | Week 5 | Persona editor, BYOK keys, tool toggles |
| F4 | Knowledge Base | Weeks 6–7 | Week 7 | File upload, chunking, pgvector embeddings |
| F5 | Chat Playground | Weeks 8–9 | Week 9 | Streaming chat, RAG injection, tool calling |
| F6 | Security & Analytics | Weeks 10–11 | Week 11 | Audit viewer, Sentry, Grafana, analytics UI |
| — | QA + Buffer | Week 12 | Week 12 | Load testing, bug fixes, beta invite prep |

> Only **Feature 1 (Auth & Foundation)** is currently scoped into detailed stories. Feature 2 stories will be shared after Feature 1 is signed off — one feature at a time, so nothing gets lost.

### Feature 1 — Auth & Foundation: Stories

**Backend**
- `CS-003` — Supabase Setup
- `CS-004` — FastAPI Foundation
- `CS-005` — Auth API Endpoints
- `CS-006` — Auth Backend Tests

**Frontend**
- `CS-007` — TypeScript Types + API Client
- `CS-008` — Login + Signup Pages
- `CS-009` — App Shell (Sidebar + Top Bar)
- `CS-010` — Frontend Tests

---

## Design System

Every component must follow these tokens. **Never hardcode a color, font, or spacing value.**

### Colors

| Token | Hex | When to use |
|---|---|---|
| Primary (Brand Blue) | `#185FA5` | Primary CTA buttons, active states, links |
| Teal | `#1D9E75` | Success, active badges, AI response indicator |
| Purple | `#7F77DD` | AI/model identity — use sparingly |
| Sidebar Background | `#0F172A` | Left navigation sidebar only |
| Page Background | `#F1F5F9` | App page background — never pure white |
| Surface | `#FFFFFF` | Cards, panels, modals |
| Border | `#E2E8F0` | 0.5px borders on all cards and inputs |
| Text Primary | `#0F172A` | All headings and body text |
| Text Secondary | `#64748B` | Labels, metadata, helper text |

### Typography

| Use | Spec | Example |
|---|---|---|
| Page heading | 22px / 500 | "Dashboard" |
| Section heading | 16px / 500 | "Recent Copilots" |
| Body text | 14px / 400 | Descriptions, values |
| Metadata / small | 12px / 400, `#64748B` | Dates, file sizes |
| Section labels | 11px / 500 UPPERCASE | "KNOWLEDGE BASE" |
| Code / API keys | 13px JetBrains Mono | `claude-sonnet-4-6` |

### Rules — Never Break These

- No box shadows anywhere — flat design only
- No gradients — solid fills only
- One primary (blue) CTA button per screen
- Page background is `#F1F5F9`, never pure white
- Border weight is always 0.5px
- Minimum font size is 12px — never smaller
- Font weights are 400 (body) and 500 (headings) only — never 700

---

## Security & HIPAA Requirements

Medtech clients require HIPAA-ready structure from day one. **These are not optional** — if any item below is skipped, the feature will be rejected in review.

| Requirement | How we implement it |
|---|---|
| Encryption in transit | TLS 1.3 via Nginx reverse proxy |
| Encryption at rest | AES-256 via Supabase (default on) |
| API key encryption | AES-256 encrypted in FastAPI before DB insert — never plaintext |
| Tenant isolation | Row Level Security on all 10 tables — enforced at DB level |
| Audit trail | Every user action logged to `audit_logs` — insert only, never delete |
| RBAC | Admin: full access. Member: cannot delete, cannot see audit logs or keys |
| Auth tokens | Access token in memory only. Refresh token in httpOnly cookie. |
| Rate limiting | 100 req/min per user. 10 req/min on auth endpoints. |
| Input validation | Pydantic v2 validates all inputs. Malformed input returns 422, not 500. |
| Secrets | `.env` never committed to git. All secrets in env variables only. |

---

## Getting Started

### Install Required Tools

- Node.js LTS (v20+)
- Python 3.12
- Git
- Docker Desktop
- Cursor (AI code editor)

### Environment Setup

```bash
# Clone the repo (link provided separately)
git clone <repo-url>

# Copy and fill in environment variables
cp .env.example .env

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd backend && pip install -r requirements.txt

# Start both services
docker-compose up

# Verify the backend is healthy
curl localhost:8000/health
# Expect: { "status": "ok" }
```

### Before Writing Any Code

- Read this entire document
- Review the database schema migration file
- Understand the 5-layer architecture
- Understand the design system tokens
- Ask the reviewer to clarify anything unclear — **do not assume**

---

## Daily Development Workflow

### Git Branching

- `main` is always deployable — never commit directly to `main`
- `develop` is the working branch
- Create a feature branch per story: `feat/cs-003-supabase-setup`
- Open a Pull Request when done — reviewer approves before merging

### Definition of Done

A story is only **Done** when ALL of the following are true:

- [ ] All acceptance criteria are checked off
- [ ] Tests written and passing
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] No console errors in browser
- [ ] No secrets in code
- [ ] Pull Request reviewed and approved

---

## Using Cursor (AI Coding Assistant)

> **Rule:** Never paste a vague prompt like "build the auth feature." Always paste one specific, well-defined task with context.
>
> ✅ **Good:** "Write a Pydantic schema for `POST /api/auth/signup` with fields: `full_name` (str, min 2), `email` (EmailStr), `password` (str, min 8), `org_name` (str, min 2)"
>
> ❌ **Bad:** "Build the signup endpoint"

- **Use Cursor for:** boilerplate, schemas, CRUD endpoints, test scaffolding
- **Never use Cursor for:** auth logic, RLS policies, encryption, architecture decisions
- **Review every line** Cursor generates — you are responsible for it

---

## Questions & Contact

For any questions about scope, architecture, or implementation decisions — **ask the reviewer before writing code**. It's faster to clarify upfront than to rebuild later.

---

*This document covers Feature 1 only. Feature 2 (Admin Dashboard) stories will be shared after Feature 1 is signed off. One feature at a time — nothing gets lost.*

**Confidential — Internal Use Only**
