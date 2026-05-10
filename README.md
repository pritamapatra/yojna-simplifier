# Yojana Simplifier – Karnataka Pilot

A lightweight web application that reads confusing government scheme pages (starting with Karnataka) and turns them into clean, easy summaries showing what the scheme is, who is eligible, and how to apply. Built for citizens in Tier 2/3 cities and mediators (NGO workers, cyber café owners) who need clear, jargon-free information.

## Tech Stack
- **Frontend:** Next.js (App Router), React, CSS Modules (Vanilla CSS design system)
- **Backend:** Next.js API Route (Node runtime) integrating with Anakin URL Scraper API
- **Deployment:** Ready for Vercel

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Rename `.env.local.example` to `.env.local` or create a new `.env.local` file and add your Anakin API key:
   ```env
   ANAKIN_API_KEY=your_anakin_api_key_here
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- **Clean Mobile-First UI:** Accessible and readable interface designed for low-to-mid range devices.
- **Dynamic Summaries:** Pulls official URLs through Anakin URL Scraper to extract "Overview," "Eligibility," "Documents," and "Steps."
- **One-Click Copy:** Easily copy WhatsApp-friendly formatted text to share with others.
- **Robust Error Handling:** Clear, non-technical error messages with fallback data and options to visit official sites directly.
