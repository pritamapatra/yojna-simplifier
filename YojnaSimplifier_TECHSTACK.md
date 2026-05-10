## **Frontend**

**Choice:** Next.js (latest, App Router, React Server Components)

**Why:**

* You already planned to use Next.js, and in 2026 it’s still one of the top full‑stack frameworks with strong support for server components, server actions, and API routes.  
* App Router lets you keep **UI \+ API \+ server logic in a single repo**, which perfectly fits a small product like Yojana Simplifier.  
* Excellent integration with Vercel for zero-config deployment and performance optimizations.

**Pattern:**

* Single page at / for the app:  
  * \<Header /\>  
  * \<SchemeSelector /\>  
  * \<SummarySections /\> (Overview, Eligibility, Documents & Steps)  
  * \<ErrorBanner /\> and \<CopyButton /\>

All can be server components except small interactive bits (dropdown, buttons) as client components.

---

## **Backend**

**Choice:** Next.js API route (or Server Action) calling Anakin’s REST API

**Why:**

* Next.js API routes in 2026 are fully capable for small apps and integrate tightly with the frontend.  
* No need for a separate Express/FastAPI backend; you reduce overhead and keep deployment trivial.  
* You can keep your Anakin API key on the server side only, never exposed to the browser.

**Implementation:**

* Route: POST /api/scheme-info  
  * Input: { schemeId: string }  
  * Internal map: schemeId \-\> official URL (e.g., Seva Sindhu service URLs).  
  * Calls Anakin URL Scraper: https://api.anakin.io/v1/url-scraper with your key and options.  
  * Normalizes response to { overview, eligibility, documents, steps } for the frontend.

For simplicity and reliability in 2.5 hours, prefer **Node.js runtime** over Edge for this route, since you’ll be doing an external HTTP call and some JSON manipulation.

---

## **Auth**

**Choice:** No authentication (public app, no login)

**Why:**

* Your PRD explicitly marks auth, profiles, and saved data as **non-goals** for MVP, and this is a kiosk-style helper app, not a personal dashboard.  
* Skipping auth saves a huge chunk of time (no NextAuth, no sessions, no OAuth flows), which is critical in a 2.5‑hour build.

If you ever add admin-only features later (e.g., to manage scheme list), you could bolt on simple password-protected pages or a minimal auth layer then.

---

## **Database**

**Choice:** None for MVP; use in-code config

**Why:**

* PRD says “No database for MVP; mapping and simple logic live in code.”  
* Your only “data” is:  
  * A small map of schemeId \-\> { name, dept, url }  
  * Responses from Anakin API (which can be fetched on demand).  
* Introducing a database (Postgres, Mongo, etc.) adds migrations, env vars, and broader surface area with very little benefit for a 2–3 scheme pilot.

If you want persistence later (e.g., logging queries, adding more schemes via admin UI), you can add a lightweight hosted Postgres (Supabase/Neon) then.

---

## **Deployment**

**Choice:** Vercel for hosting the Next.js app

**Why:**

* Vercel is still the default, highly-optimized platform for Next.js, with zero-config deployment and built-in CI.  
* Easy environment variable management for ANAKIN\_API\_KEY.  
* Good observability for such a small app (logs, function metrics).

**Flow:**

* Push to GitHub → connect repo to Vercel → automatic builds on each push.  
* Configure ANAKIN\_API\_KEY and any SCHEME\_URL\_\* variables in Vercel dashboard.

---

## **Summary stack**

* **Frontend:** Next.js (App Router, React Server Components, minimal client components)  
* **Backend:** Next.js API route /api/scheme-info (Node runtime) calling Anakin URL Scraper API.  
* **Auth:** None for MVP (public app).  
* **Database:** None; use in-code config for scheme metadata.  
* **Deployment:** Vercel, with environment variables for secrets.

This stack minimizes moving parts, matches 2026 best practices for small full-stack apps, and lets you spend almost all your time on **UX \+ integration with Anakin**, which is exactly what your PRD cares about.

