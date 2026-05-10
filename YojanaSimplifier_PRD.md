## **1\. Product overview**

**Product name (working):** Yojana Simplifier – Karnataka Pilot

**One-line description:**  
A simple web app that reads confusing government scheme pages (starting with Karnataka) and turns them into clean, easy summaries showing what the scheme is, who is eligible, and how to apply, using Anakin’s URL Scraper API on official URLs.

**Problem**

* Government portals and scheme pages (myScheme, Seva Sindhu, department sites) are text-heavy, full of jargon, and hard to navigate, especially for Tier 2/3 city citizens.  
* Many people rely on café owners, NGO workers, or local agents who manually read these pages and explain them, which is slow and error-prone.

**Solution**  
A lightweight web app where a user selects a scheme and instantly gets a human-friendly summary of: overview, eligibility, required documents, and steps to apply. The app uses Anakin’s scraping API under the hood to pull and structure data from official scheme pages, so content can update when sites change.

---

## **2\. Goals and non-goals**

## **Primary goals (MVP)**

1. Enable a user to select from a small list of Karnataka government schemes and see a clear, readable summary in under 5 seconds.  
2. Extract and display, for each selected scheme:  
   * What the scheme is (Overview)  
   * Who is eligible (Eligibility)  
   * What documents and steps are needed to apply (Documents & Steps)  
3. Make the UI usable on low-end smartphones (Tier 2/3 environments) with minimal scrolling and clear typography.

## **Secondary goals**

1. Allow quick copy/share of the summary so it can be pasted into WhatsApp or printed.  
2. Handle common failures (API error, page structure changes) gracefully with helpful messages and a retry option.

## **Explicit non-goals (for this 2.5-hour build)**

* No user login, profile, or saved schemes.  
* No full India-wide search or eligibility questionnaire like myScheme.  
* No multilingual support in v1 (stick to English/simple Hinglish wording).  
* No complex analytics or admin dashboards.

---

## **3\. Target users**

## **Primary users**

1. **Citizens in Tier 2/3 cities**  
   * Profiles: farmers, daily wage workers, small shop owners, students.  
   * Needs: Quick understanding of whether a scheme applies to them, and what they need to do, without reading long government pages.  
2. **Mediators / helpers**  
   * Cyber café owners, NGO workers, SHG leaders, village volunteers.  
   * Needs: A single, clean screen they can show to citizen while helping them apply on official portals in another tab.

## **Environment**

* Devices: Low to mid-range Android phones, shared desktops in cafés.  
* Network: Patchy mobile data, so pages must load fast and be small.  
* Context: Often used with someone sitting next to them, reading aloud or translating.

---

## **4\. User stories**

## **Discovery and selection**

* As a **café owner in a Tier 2 town**, I want to quickly select a known scheme from a dropdown so I don’t waste time searching government portals manually every time.  
* As a **farmer**, I want to recognize the scheme name I heard on TV/WhatsApp and tap it to know what it actually gives and whether I qualify.

## **Understanding the scheme**

* As a **citizen**, I want to see in simple words what the scheme is about so I can decide if it’s relevant to me.  
* As a **citizen**, I want to clearly see who is eligible (age, income, landholding, location, etc.) so I don’t start an application I can never complete.  
* As a **helper**, I want a concise list of required documents and step-by-step actions so I can guide someone through the application efficiently.

## **Sharing and reuse**

* As a **helper**, I want to copy all the scheme details in one click so I can send it to someone on WhatsApp or print it.  
* As a **citizen**, I want to take a screenshot or share a summary so I can show it later to my family or local official.

## **Handling errors**

* As a **user**, if the official website is down or changed, I want a clear message explaining that details couldn’t be fetched and that I should try again later or open the official site directly.

---

## **5\. Feature list (MVP)**

## **5.1 Scheme selector**

* A simple dropdown or list of 2–3 preconfigured schemes for Karnataka (e.g., PM-Kisan Karnataka flow, one welfare scheme, one student or pension scheme).  
* Each item has:  
  * Human-friendly name  
  * Ministry/department label  
  * Internally mapped official URL for scraping (from Seva Sindhu or relevant government page).

**Acceptance criteria:**

* User can select a scheme and click a “Get Details” button.  
* The app sends the associated URL to a Next.js API route that calls Anakin’s URL Scraper.

## **5.2 Scheme summary view**

Sections (for each scheme):

1. **Overview**  
   * 2–4 short bullet points explaining purpose, target group, and main benefit.  
2. **Eligibility**  
   * Bullet list of clear conditions (e.g., “Resident of Karnataka”, “Small/marginal farmer”, “Income below X”).  
3. **Documents & Steps to Apply**  
   * Documents: bullet list (Aadhaar, ration card, land records, bank passbook, etc.).  
   * Steps: small numbered list (1–5 steps) summarizing how to apply online via the portal.

**Powered by:**

* Backend calls Anakin URL Scraper with:  
  * url: official scheme URL  
  * formats: at least markdown or AI-extracted structured JSON if available  
  * Optional extraction prompt to focus on overview, eligibility, documents, steps.

**Acceptance criteria:**

* On successful fetch, the summary view fills all three sections.  
* If some fields are missing, the UI still renders with “Information not clearly available on official page” where needed.

## **5.3 Mobile-friendly layout**

* Single column layout, large headings, readable font size.  
* Clear separation between sections with cards or subtle dividers.  
* Minimal colors; high contrast for readability.

**Acceptance criteria:**

* Works well on a 360px wide viewport (small Android screen).  
* No horizontal scrolling needed.  
* Primary action buttons (Get Details, Copy) visible without too much scrolling.

## **5.4 Copy/share functionality**

* A “Copy summary” button that copies the text of all three sections into the clipboard in a readable format.  
* Optional: a “Copy WhatsApp-friendly text” variant (same content but clearly formatted).

**Acceptance criteria:**

* After clicking Copy, user gets a small toast “Summary copied – paste into WhatsApp or notes.”  
* Copied content preserves headings and bullet points.

## **5.5 Error and retry handling**

Possible error cases:

* Anakin API error (bad key, rate limit, timeout).  
* Government page down or slow.  
* Government page structure changes and extraction becomes messy.

**UI behavior:**

* Show a clear error message:  
  * “Could not fetch details from the official site right now.”  
  * Option to “Try again” and link “Open official page directly” in a new tab.

**Acceptance criteria:**

* No raw JSON or stack traces shown to users.  
* Errors are visible but non-technical.

---

## **6\. Architecture (high-level)**

## **Frontend**

* Next.js (App Router or Pages Router) deployed on Vercel.  
* One main page:  
  * Scheme selector  
  * “Get Details” button  
  * Summary sections \+ Copy button \+ error banner.

## **Backend**

* Next.js API route /api/scheme-info:  
  * Input: schemeId (e.g., "pm-kisan-ka")  
  * Internal mapping: schemeId \-\> official URL.  
  * Calls Anakin URL Scraper endpoint with:  
    * POST https://api.anakin.io/v1/url-scraper (or the documented base path)  
    * Headers: X-API-Key  
    * Body: { "url": "...", "formats": \["markdown"\], "ai\_extract": { ... } } or similar.  
  * Normalizes response into { overview, eligibility, documents, steps }.  
* No database for MVP; mapping and simple logic live in code.

---

## **7\. Success metrics (for hack/early MVP)**

Given the 2.5-hour build, success metrics are simple and qualitative:

## **Technical / product metrics**

1. **Time to information**  
   * Goal: From clicking “Get Details” to seeing summary in **\< 5 seconds** on a normal connection.  
2. **Content completeness**  
   * Goal: For initial schemes, at least **2 of 3 sections** (Overview, Eligibility, Documents & Steps) are meaningfully filled from scraped data.  
3. **Error rate**  
   * Goal: \< 10% of fetch attempts end in unhandled errors during demo; errors show helpful UI.

## **User-centric metrics (demo / validation)**

1. **Comprehension test**  
   * In a quick user test or demo, a non-technical person should be able to answer:  
     * “Who can get this scheme?”  
     * “What do I need to apply?”  
       after reading your summary screen once.  
2. **Perceived usefulness**  
   * Ask 3–5 people (or judges) after the demo: “Would this make it easier to help someone apply for a scheme?”  
   * Goal: Majority say “yes”.

