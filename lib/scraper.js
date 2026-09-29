// Lightweight URL scraper with retry logic and Cloudflare bypass
// Fetches page, strips HTML, returns clean text + metadata

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
];

function randomUA() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

// Fetch a URL with retry logic and fallback strategies
export async function scrapeUrl(url, options = {}) {
  const { retries = 2, timeout = 15000 } = options;

  // Strategy 1: Standard fetch with random UA
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, {
        headers: {
          "User-Agent": randomUA(),
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
        },
        redirect: "follow",
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (res.ok && res.headers.get("content-type")?.includes("text/html")) {
        const html = await res.text();
        const cleaned = cleanHtml(html);
        if (cleaned.length > 200) {
          return {
            status: res.status,
            title: extractTitle(html),
            meta: extractMeta(html),
            content: cleaned,
            fetchedAt: new Date(),
            strategy: `fetch-attempt-${attempt + 1}`,
          };
        }
      }

      // Got HTML but too short — maybe a block page
      if (res.headers.get("content-type")?.includes("text/html")) {
        const html = await res.text();
        const cleaned = cleanHtml(html);
        // If it's short or looks like a block page, try next strategy
        if (cleaned.length < 200 || cleaned.includes("cf-error") || cleaned.includes("Access Denied") || cleaned.includes("checking your browser")) {
          continue; // try next attempt with different UA
        }
        return {
          status: res.status,
          title: extractTitle(html),
          meta: extractMeta(html),
          content: cleaned,
          fetchedAt: new Date(),
          strategy: `fetch-attempt-${attempt + 1}`,
        };
      }
    } catch (error) {
      if (attempt === retries) {
        return { error: `${error.name}: ${error.message}`, content: null, url };
      }
      // Short wait before retry
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  // Strategy 2: Try with browser headers only (no Chrome)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, {
      headers: {
        "User-Agent": randomUA(),
        Accept: "text/html",
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const html = await res.text();
      const cleaned = cleanHtml(html);
      return {
        status: res.status,
        title: extractTitle(html),
        meta: extractMeta(html),
        content: cleaned,
        fetchedAt: new Date(),
        strategy: "browser-headers",
        warning: cleaned.length < 200 ? "Content may be blocked or minimal" : null,
      };
    }
  } catch (error) {
    // Fall through to error
  }

  return {
    error: "Site may be blocking automated access (Cloudflare, CAPTCHA, etc.)",
    content: null,
    url,
    suggestion: "Try adding the competitor manually in your dashboard after signing up.",
  };
}

function cleanHtml(html) {
  if (!html || typeof html !== "string") return "";
  // Remove script/style/noscript/svg/iframe
  let text = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, " ")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ") // Remove comments
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, " ")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, " ")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, " ");

  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, "…")
    .replace(/&#\d+;/g, (m) => String.fromCharCode(m.match(/\d+/)[0]))
    .replace(/&[a-z]+;/gi, " ");

  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Remove common block page phrases
  const blockPhrases = [
    "checking your browser", "please wait", "redirecting", "cf-error",
    "access denied", "cloudflare", "incapsula", "attention required",
    "just a moment", "verify you are human",
  ];
  for (const phrase of blockPhrases) {
    if (text.toLowerCase().includes(phrase) && text.length < 500) {
      return ""; // Definitely a block page
    }
  }

  return text.substring(0, 50000);
}

function extractTitle(html) {
  if (!html) return null;
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractMeta(html) {
  if (!html) return {};
  const meta = {};
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);
  if (descMatch) meta.description = descMatch[1];
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i);
  if (ogTitle) meta.ogTitle = ogTitle[1];
  const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)/i);
  if (ogDesc) meta.ogDescription = ogDesc[1];
  return meta;
}

// Simple content hash for change detection
export function hashContent(content) {
  if (!content) return "0-0";
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash + content.charCodeAt(i)) | 0;
  }
  return `${content.length}-${hash}`;
}

// Compare two contents, return diff summary
export function diffContent(oldContent, newContent) {
  if (!oldContent) return { changed: true, summary: "First snapshot" };
  if (!newContent) return { changed: false, summary: "No content retrieved" };

  const oldLen = oldContent.length;
  const newLen = newContent.length;

  let firstDiff = -1;
  const minLen = Math.min(oldLen, newLen);
  for (let i = 0; i < minLen; i++) {
    if (oldContent[i] !== newContent[i]) {
      firstDiff = i;
      break;
    }
  }
  if (firstDiff === -1 && oldLen !== newLen) firstDiff = minLen;

  // Extract meaningful excerpts
  const oldExcerpt = extractKeyExcerpt(oldContent, firstDiff >= 0 ? firstDiff : 0);
  const newExcerpt = extractKeyExcerpt(newContent, firstDiff >= 0 ? firstDiff : 0);

  return {
    changed: oldLen !== newLen || firstDiff !== -1,
    oldLength: oldLen,
    newLength: newLen,
    delta: newLen - oldLen,
    firstDiffAt: firstDiff,
    excerpt: newExcerpt,
    oldExcerpt,
  };
}

function extractKeyExcerpt(content, around) {
  if (!content) return "";
  const start = Math.max(0, around - 200);
  const end = Math.min(content.length, around + 400);
  let excerpt = content.substring(start, end).trim();
  // Clean up: remove excessive spaces
  excerpt = excerpt.replace(/\s+/g, " ");
  return excerpt;
}

// AI summarization using OpenAI-compatible API
// Falls back to heuristic if no API key
export async function summarizeChange(diff, competitorName) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return heuristicSummary(diff, competitorName);
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a competitive intelligence analyst. Summarize website changes in 1-2 sentences. Focus on what changed (pricing, features, messaging) and what it might mean strategically for a SaaS founder.",
          },
          {
            role: "user",
            content: `Competitor: ${competitorName}\n\nChange detected:\n- Content length: ${diff.oldLength} → ${diff.newLength} chars (${diff.delta > 0 ? "+" : ""}${diff.delta} chars)\n- Changed: ${diff.changed ? "Yes" : "No"}\n\nContent excerpt (around change):\n${diff.excerpt || "(none available)"}\n\nProvide a concise 1-2 sentence summary of what likely changed and what it means for competitors.`,
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    const summary = data.choices?.[0]?.message?.content?.trim();
    if (summary && summary.length > 10) return summary;
    return heuristicSummary(diff, competitorName);
  } catch (error) {
    console.warn("AI summary failed, using heuristic:", error.message);
    return heuristicSummary(diff, competitorName);
  }
}

function heuristicSummary(diff, competitorName) {
  if (!diff.changed) return `No significant changes detected for ${competitorName} since the last check.`;

  const absDelta = Math.abs(diff.delta || 0);
  const pct = diff.oldLength > 0 ? Math.round((absDelta / diff.oldLength) * 100) : 0;

  if (absDelta > 5000) {
    return `${competitorName} made significant content changes (${pct}% ${diff.delta > 0 ? "growth" : "reduction"}). Likely added a major new section, pricing page update, or large content expansion. Worth investigating the full report.`;
  }
  if (absDelta > 1000) {
    return `${competitorName} updated ${pct}% of their content (${diff.delta > 0 ? "+" : ""}${diff.delta} chars). Could indicate new features, pricing changes, or a content refresh.`;
  }
  if (absDelta > 200) {
    return `${competitorName} made moderate updates (${diff.delta > 0 ? "+" : ""}${diff.delta} chars). Usually indicates copy tweaks, new testimonials, or small feature additions.`;
  }
  if (diff.delta !== 0) {
    return `${competitorName} made minor content adjustments (${diff.delta > 0 ? "+" : ""}${diff.delta} chars). Likely a/b testing copy or minor bug fixes.`;
  }
  return `${competitorName} restructured their page — content length unchanged but text differs. Possible template update or layout change.`;
}

// Generate a structured report from scraped content (for free-tracker)
export function generateQuickReport(scraped, competitorUrl) {
  if (!scraped.content || scraped.content.length < 100) {
    return {
      success: false,
      reason: scraped.error || "Could not retrieve competitor's website content.",
      suggestion: scraped.suggestion || "The site may be blocking automated access. Try adding this competitor in your dashboard.",
    };
  }

  const content = scraped.content;
  const findings = [];

  // Detect pricing mentions
  const pricingPatterns = [
    /\$[\d,]+(?:\/|\s*per|\s*month|\s*year|\s*mo|\s*yr)/gi,
    /(?:price|pricing|cost|fee)[\s:]+[\$][\d,]+/gi,
    /(?:free|trial|basic|pro|enterprise)[\s]+(?:plan|tier|from)?[\s]*[\$]?[\d,]+/gi,
  ];
  for (const p of pricingPatterns) {
    const matches = content.match(p);
    if (matches && matches.length > 0) {
      findings.push({ type: "pricing", count: matches.length, samples: [...new Set(matches)].slice(0, 3) });
      break;
    }
  }

  // Detect feature keywords
  const featureKeywords = ["feature", "integration", "api", "dashboard", "analytics", "automation", "ai", "ml", "machine learning"];
  for (const kw of featureKeywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    const count = (content.match(regex) || []).length;
    if (count > 3) {
      findings.push({ type: "feature", keyword: kw, count });
    }
  }

  // Detect social proof
  const socialKeywords = ["customer", "company", "team", "founder", "trusted by", "used by", "case study"];
  for (const kw of socialKeywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    const count = (content.match(regex) || []).length;
    if (count > 5) {
      findings.push({ type: "social-proof", keyword: kw, count });
      break;
    }
  }

  // Content freshness signals
  const freshKeywords = ["2024", "2025", "new", "launch", "update", "announce"];
  for (const kw of freshKeywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    if ((content.match(regex) || []).length > 2) {
      findings.push({ type: "freshness", keyword: kw });
      break;
    }
  }

  return {
    success: true,
    url: competitorUrl,
    title: scraped.title,
    contentLength: content.length,
    strategy: scraped.strategy,
    findings,
    summary: generateReportSummary(findings, competitorUrl),
  };
}

function generateReportSummary(findings, competitorUrl) {
  if (findings.length === 0) {
    return `We scraped ${competitorUrl} successfully and found ${findings.length === 0 ? "general content" : ""}. Sign up to get detailed AI-powered analysis of competitor changes.`;
  }

  const lines = [];
  for (const f of findings) {
    if (f.type === "pricing") {
      lines.push(`Pricing signals detected: ${f.samples.join(", ")}`);
    } else if (f.type === "feature") {
      lines.push(`Strong focus on "${f.keyword}" (${f.count} mentions)`);
    } else if (f.type === "social-proof") {
      lines.push(`Customer-focused messaging detected`);
    } else if (f.type === "freshness") {
      lines.push(`Recent updates or announcements visible`);
    }
  }

  return lines.join(". ") + ". Sign up to get AI-predicted competitor moves delivered to your inbox.";
}
