// Lightweight URL scraper — fetches page, strips HTML, returns clean text
// Plus a snapshot/diff system to detect changes over time

import { db } from "@/db";
import { competitors, snapshots, insights } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

// Add these tables in migration (we'll create at runtime too)

// Fetch a URL and return clean text
export async function scrapeUrl(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PerceptaGalaxy/1.0; +https://perceptagalaxy.com)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (!res.ok) {
      return { error: `HTTP ${res.status}`, content: null };
    }

    const html = await res.text();
    const cleaned = cleanHtml(html);

    return {
      status: res.status,
      title: extractTitle(html),
      meta: extractMeta(html),
      content: cleaned,
      fetchedAt: new Date(),
    };
  } catch (error) {
    return { error: error.message, content: null };
  }
}

function cleanHtml(html) {
  // Remove script/style/noscript/svg
  let text = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "");

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
    .replace(/&ndash;/g, "–");

  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  return text.substring(0, 50000); // Cap at 50K chars
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractMeta(html) {
  const meta = {};
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);
  if (descMatch) meta.description = descMatch[1];

  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i);
  if (ogTitle) meta.ogTitle = ogTitle[1];

  return meta;
}

// Simple content hash for change detection
export function hashContent(content) {
  // Use a simple character sum + length check (good enough for diff detection)
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash + content.charCodeAt(i)) | 0;
  }
  return `${content.length}-${hash}`;
}

// Compare two contents, return diff summary
export function diffContent(oldContent, newContent) {
  if (!oldContent) return { changed: true, summary: "First snapshot" };

  const oldLen = oldContent.length;
  const newLen = newContent.length;

  // Find first significant difference (chars that change)
  let firstDiff = -1;
  const minLen = Math.min(oldLen, newLen);
  for (let i = 0; i < minLen; i++) {
    if (oldContent[i] !== newContent[i]) {
      firstDiff = i;
      break;
    }
  }
  if (firstDiff === -1 && oldLen !== newLen) firstDiff = minLen;

  return {
    changed: oldLen !== newLen || firstDiff !== -1,
    oldLength: oldLen,
    newLength: newLen,
    delta: newLen - oldLen,
    firstDiffAt: firstDiff,
    // Return a snippet of what's around the change
    excerpt: firstDiff >= 0
      ? newContent.substring(Math.max(0, firstDiff - 100), Math.min(newLen, firstDiff + 300))
      : null,
  };
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
              "You are a competitive intelligence analyst. Summarize website changes in 1-2 sentences. Focus on what changed (pricing, features, messaging) and what it might mean strategically.",
          },
          {
            role: "user",
            content: `Competitor: ${competitorName}\n\nChange detected:\n${JSON.stringify(diff, null, 2)}\n\nExcerpt around change: ${diff.excerpt || "(none)"}\n\nProvide a concise summary.`,
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || heuristicSummary(diff, competitorName);
  } catch (error) {
    console.warn("AI summary failed, using heuristic:", error.message);
    return heuristicSummary(diff, competitorName);
  }
}

function heuristicSummary(diff, name) {
  if (!diff.changed) return `No changes detected for ${name}.`;
  if (diff.delta > 500) return `${name} added significant content (${diff.delta} more characters). Likely added features, blog posts, or updated copy.`;
  if (diff.delta < -500) return `${name} removed significant content (${Math.abs(diff.delta)} fewer characters). May have simplified messaging or removed features.`;
  if (diff.delta !== 0) return `${name} made minor copy updates (${diff.delta > 0 ? "+" : ""}${diff.delta} characters).`;
  return `${name} had content reshuffled but length unchanged. Possible rearrangement or template change.`;
}
