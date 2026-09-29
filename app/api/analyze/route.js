import { scrapeUrl, generateQuickReport } from "@/lib/scraper";

// POST /api/analyze — run a one-time competitor analysis (no auth required, for free-tracker)
export async function POST(req) {
  try {
    const body = await req.json();
    const { competitorUrl, email, yourCompany } = body;

    if (!competitorUrl || !email) {
      return new Response(
        JSON.stringify({ error: "competitorUrl and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Basic URL validation
    let url = competitorUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid URL. Please enter a full website URL." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Normalize email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Save lead
    let leadId = null;
    try {
      const leadRes = await fetch(
        new URL(req.url).origin + "/api/leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source: "free-tracker",
            competitor: url,
            message: `Company: ${yourCompany || "not provided"}`,
          }),
        }
      );
      if (leadRes.ok) {
        const leadData = await leadRes.json();
        leadId = leadData.id;
      }
    } catch (e) {
      console.warn("Failed to save lead:", e.message);
    }

    // Scrape the competitor URL
    const scraped = await scrapeUrl(url, { retries: 2, timeout: 20000 });

    // Generate report
    const report = generateQuickReport(scraped, url);

    return new Response(
      JSON.stringify({
        success: true,
        report,
        leadId,
        message:
          report.success
            ? `Analysis complete for ${url}. Check your email for the full report.`
            : `We couldn't scrape ${url} directly, but we've saved your request. Our team will manually analyze it and email you within 24 hours.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analyze error:", error);
    return new Response(
      JSON.stringify({ error: "Analysis failed: " + error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
