// Simple lead capture endpoint — accepts emails from any form on the site
// Stores them in memory (for now). When DB is added, we'll persist.

const leads = []; // TODO: replace with DB query when database is configured

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, source, competitor, message } = body;

    // Basic validation
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lead = {
      email,
      source: source || "unknown",
      competitor: competitor || null,
      message: message || null,
      timestamp: new Date().toISOString(),
    };

    leads.push(lead);
    console.log("New lead:", lead);

    // TODO: forward to email sequence / CRM
    // TODO: send confirmation email via Resend

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  // For testing/admin — list lead count (don't expose emails)
  return new Response(JSON.stringify({ count: leads.length }), {
    headers: { "Content-Type": "application/json" },
  });
}
