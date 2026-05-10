## **1\. Design goals**

* Feel like a **trusted government-adjacent helper**, not a flashy startup app.  
* Visually familiar to users who’ve seen myScheme / Seva Sindhu, so it feels “official enough” and easy to trust.  
* Extremely **clean, uncluttered, and mobile-first** for Tier 2/3 users.

---

## **2\. Color system**

Based on myScheme’s modern, India-gov style with soft, friendly colors and high contrast for key actions.

* **Primary color:**  
  * Soft blue (for trust, matching gov tech vibes)  
  * Use for primary buttons, links, active states.  
* **Accent color:**  
  * Warm yellow/orange for highlights (section badges, small accents).  
* **Neutrals:**  
  * Background: very light grey or off-white  
  * Cards: white with subtle shadow or border  
  * Text: dark grey (not pure black) for comfortable reading.

Usage:

* Header bar: white background, primary color for logo text/icon and active nav item.  
* Primary buttons: filled primary blue with white text.  
* Secondary buttons: outlined primary or neutral.

---

## **3\. Typography**

myScheme uses a clean, sans-serif, web-safe look with clear hierarchy.

* **Font family:**  
  * System sans-serif (e.g., system-ui, \-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif) or a single web font like Inter.  
* **Hierarchy:**  
  * H1 (page title): 24–28px, semi-bold.  
  * H2 (section titles like “Overview”, “Eligibility”): 18–20px, bold.  
  * Body: 14–16px, regular; line-height \~1.5.  
  * Labels / badge text: 12–14px, medium.  
* **Style:**  
  * No fancy fonts, no italics.  
  * Keep it functional and readable, just like myScheme’s “How it works” and FAQ sections.

---

## **4\. Layout & structure**

Take cues from myScheme: centered content, clear sections, and card-based blocks.

## **4.1 Overall layout**

* **Top header:**  
  * Left: simple wordmark “Yojana Simplifier” (or icon \+ text).  
  * Right: tiny “Beta” badge and maybe a small text “Not an official govt website”.  
* **Main content (single column on mobile):**  
  * Section 1: Hero \+ scheme selector  
  * Section 2: Summary cards  
  * Section 3: FAQ / small note  
* **Width:**  
  * Max width \~960px on desktop, centered.  
  * Full-width single column on mobile.

## **4.2 Hero & selector**

* Hero area similar to myScheme’s clean intro zone: short text on left, key action on right (on desktop).  
* Content:  
  * Title: “Understand schemes in simple language”  
  * Subtitle: one line about helping Karnataka citizens know who’s eligible and how to apply.  
  * Scheme selector card:  
    * Dropdown for “Select a scheme”  
    * “Get details” primary button  
    * Small text: “Data fetched from official Karnataka portals using Anakin Scraper API.”

---

## **5\. Components & style**

## **5.1 Cards**

Inspired by myScheme’s “How it works” and FAQ cards.

* **Card style:**  
  * White background  
  * Slight rounded corners (border-radius: 8px)  
  * Soft shadow or subtle border (1px solid \#e5e7eb)  
  * Internal padding (16–20px)

Use cards for:

* Scheme summary sections: Overview, Eligibility, Documents & Steps.  
* Optional info/FAQ.

## **5.2 Buttons**

* **Primary button:**  
  * Filled primary blue background, white text.  
  * Rounded corners (4–6px).  
  * Hover: slightly darker blue, small elevation or border.  
* **Secondary button:**  
  * Border primary blue, white background, primary text.  
  * Used for “Copy summary”.  
* **Disabled state:**  
  * Lighter blue/grey, no hover effect.

## **5.3 Tags / badges**

Take inspiration from small colored tags in gov portals (e.g., “New”, “Popular”).

* Use small pill badges for:  
  * “State: Karnataka”  
  * “Category: Agriculture / Pension / Education”

Style:

* Light background (tinted primary)  
* Primary text, 12px font, medium weight.

## **5.4 Summary sections**

Each main section (Overview, Eligibility, Documents & Steps):

* Section title row:  
  * Left: Title (H2)  
  * Right: small tag like “From official site”  
* Body:  
  * Short, bullet lists like myScheme’s FAQ answers: concise, plain language.  
  * Avoid long paragraphs; prefer bullets or numbered lists.

---

## **6\. States: loading, errors, empty**

## **6.1 Loading**

* Show a friendly inline loader in the summary area (e.g., three grey skeleton lines in each card).  
* Add text: “Fetching details from official portal…”

## **6.2 Error state**

Similar to government portals’ info alerts but cleaner.

* Light red or amber bordered box above cards:  
  * Title: “Could not fetch scheme details right now.”  
  * Body: “You can try again or open the official page directly.”  
  * Buttons: “Try again” (primary), “Open official site” (link-style).

## **6.3 Empty state (before selection)**

* Neutral illustration or icon \+ text:  
  * “Select a scheme to see a simple summary of who is eligible and how to apply.”

---

## **7\. Tone & microcopy**

Take inspiration from myScheme’s simple, supportive explanation style.

* **Tone:** Calm, helpful, non-technical.  
* **Examples:**  
  * Buttons: “Get details”, “Copy summary”, “Try again”.  
  * Helper text: “Information shown here is summarised from official government websites.”  
  * Disclaimer: “Always verify details on the official portal before applying.”

Avoid jargon like “scraping”, “API”, “LLM” in user-facing text.

---

## **8\. Accessibility & mobile considerations**

* High contrast between text and background.  
* Touch-friendly tap targets (min 44px height for buttons).  
* No tiny fonts; body text min 14px.  
* Test on a narrow viewport so nothing overflows horizontally.

