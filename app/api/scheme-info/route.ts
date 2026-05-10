import { NextRequest, NextResponse } from 'next/server';
import { getSchemeById } from '@/lib/schemes';
import { SchemeInfoResponse } from '@/lib/types';

export const runtime = 'nodejs';

/**
 * POST /api/scheme-info
 * Accepts { schemeId: string } and returns a structured scheme summary
 * by scraping the official URL via Anakin URL Scraper API.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schemeId } = body;

    // Validate input
    if (!schemeId || typeof schemeId !== 'string') {
      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: 'Please provide a valid scheme ID.',
        },
        { status: 400 }
      );
    }

    // Look up scheme metadata
    const scheme = getSchemeById(schemeId);
    if (!scheme) {
      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: 'Scheme not found. Please select a valid scheme.',
        },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.ANAKIN_API_KEY;
    if (!apiKey || apiKey === 'your_anakin_api_key_here') {
      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: 'Service configuration error. Please try again later.',
          officialUrl: scheme.officialUrl,
        },
        { status: 500 }
      );
    }

    // Call Anakin URL Scraper API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    let anakinResponse: Response;
    try {
      anakinResponse = await fetch('https://api.anakin.io/v1/url-scraper', {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: scheme.officialUrl,
          formats: ['markdown'],
        }),
        signal: controller.signal,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json<SchemeInfoResponse>(
          {
            success: false,
            error: 'The request took too long. The official portal may be slow. Please try again.',
            officialUrl: scheme.officialUrl,
          },
          { status: 504 }
        );
      }
      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: 'Could not connect to the data service. Please try again later.',
          officialUrl: scheme.officialUrl,
        },
        { status: 502 }
      );
    }

    clearTimeout(timeoutId);

    // Handle non-200 responses from Anakin
    if (!anakinResponse.ok) {
      const statusCode = anakinResponse.status;
      let errorMessage = 'Could not fetch details from the official site right now.';

      if (statusCode === 401 || statusCode === 403) {
        errorMessage = 'Service authentication error. Please try again later.';
      } else if (statusCode === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (statusCode >= 500) {
        errorMessage = 'The data service is temporarily unavailable. Please try again later.';
      }

      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: errorMessage,
          officialUrl: scheme.officialUrl,
        },
        { status: 502 }
      );
    }

    // Parse Anakin response
    let anakinData = await anakinResponse.json();

    // If the API returns a pending job, we need to poll for the result
    if (anakinData?.jobId && anakinData?.status === 'pending') {
      const jobId = anakinData.jobId;
      let isCompleted = false;
      let attempts = 0;
      const maxAttempts = 5; // 5 attempts * 2s = 10s max polling

      while (!isCompleted && attempts < maxAttempts) {
        attempts++;
        // Wait 2 seconds before polling
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        try {
          const pollResponse = await fetch(`https://api.anakin.io/v1/url-scraper/${jobId}`, {
            method: 'GET',
            headers: {
              'X-API-Key': apiKey,
            },
            signal: controller.signal,
          });

          if (pollResponse.ok) {
            anakinData = await pollResponse.json();
            if (anakinData?.status === 'completed' || anakinData?.status === 'success' || anakinData?.data) {
              isCompleted = true;
            } else if (anakinData?.status === 'failed' || anakinData?.status === 'error') {
              break; // exit loop on failure
            }
          }
        } catch (e) {
          // Ignore network errors during polling and try again
        }
      }
    }

    // Extract the markdown content from the response
    // Anakin typically returns { data: { markdown: "..." } } or similar structure
    let rawMarkdown = '';

    if (anakinData?.data?.markdown) {
      rawMarkdown = anakinData.data.markdown;
    } else if (anakinData?.markdown) {
      rawMarkdown = anakinData.markdown;
    } else if (anakinData?.data?.content) {
      rawMarkdown = anakinData.data.content;
    } else if (anakinData?.content) {
      rawMarkdown = anakinData.content;
    } else if (typeof anakinData?.data === 'string') {
      rawMarkdown = anakinData.data;
    } else if (typeof anakinData === 'string') {
      rawMarkdown = anakinData;
    }

    if (!rawMarkdown) {
      // For debugging, include the raw JSON structure in the error message
      const debugInfo = JSON.stringify(anakinData).substring(0, 100);
      return NextResponse.json<SchemeInfoResponse>(
        {
          success: false,
          error: `Could not extract content. API returned: ${debugInfo}`,
          officialUrl: scheme.officialUrl,
        },
        { status: 502 }
      );
    }

    // Parse the markdown into structured summary
    // This will be implemented properly in Task 4.3
    const { parseSummary } = await import('@/lib/parse-summary');
    const summary = parseSummary(rawMarkdown);

    return NextResponse.json<SchemeInfoResponse>(
      {
        success: true,
        data: summary,
        officialUrl: scheme.officialUrl,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<SchemeInfoResponse>(
      {
        success: false,
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}
