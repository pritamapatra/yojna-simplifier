# Yojana Simplifier 🏛️

**Yojana Simplifier** is a mobile-first web application designed to break down the information barrier between complex government portals and everyday citizens. It intelligently live-scrapes official scheme pages and translates administrative jargon into clear, easy-to-read, and shareable summaries.

Deployed Link:- https://yojna-simplifier.vercel.app/

## 🌟 The Problem
Navigating official government portals to find scheme eligibility, required documents, and application steps is incredibly frustrating. The pages are often cluttered, slow, and poorly optimized for mobile devices, causing eligible citizens—especially in Tier 2/3 cities—to miss out on crucial benefits.

## 🚀 The Solution
Instead of forcing users to hunt through lengthy official documents, **Yojana Simplifier** acts as an intelligent intermediary. It fetches the live official scheme page, bypasses complex JavaScript-heavy (SPA) architectures using a headless browser, and instantly parses the text into four clear sections:
1. **Overview:** What the scheme actually does.
2. **Eligibility:** Who is allowed to apply.
3. **Documents Needed:** Exactly what paperwork to prepare.
4. **Steps to Apply:** A simple, numbered guide.

## ✨ Key Features
* **Live Intelligent Extraction:** Uses the Anakin AI URL Scraper API to spin up a headless browser, navigate official portals, and extract raw markdown in real-time.
* **Smart Parsing & Fallbacks:** Automatically categorizes extracted text by intent and handles missing data gracefully with clear UX fallbacks.
* **One-Click "WhatsApp Sharing":** Built-in clipboard utility automatically formats the extracted data into a clean, bulleted text block with emojis, allowing mediators (like NGO workers) to instantly share accurate scheme details.
* **Accessible & Mobile-First UX:** Built with a custom "government-adjacent" design system using Vanilla CSS tokens. Features robust loading states (to set expectations for async fetching) and smooth micro-animations.

## 🛠️ Tech Stack
* **Frontend:** Next.js 16 (App Router), React, TypeScript
* **Styling:** Custom Vanilla CSS Modules with strict `:root` design tokens
* **Backend:** Next.js Serverless API Routes (Node.js runtime)
* **Data Extraction:** Anakin.io URL Scraper API (Headless Chrome integration)
* **Deployment:** Vercel

## ⚙️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pritamapatra/yojna-simplifier.git
   cd yojna-simplifier
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Anakin API key:
   ```env
   ANAKIN_API_KEY=your_anakin_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔮 Future Scope
* **Native Translation:** Integrate LLM APIs (like OpenAI/Claude) directly into the scraping pipeline to automatically translate complex administrative English/Hindi into regional languages like Kannada and Marathi.
* **Database Caching:** Cache scraped results in Redis or PostgreSQL to reduce Anakin API calls and drop loading times from ~15s to <500ms.
* **PWA Support:** Add offline capabilities for regions with spotty internet connectivity.

---
*Built with ❤️ for better civic tech access.*
