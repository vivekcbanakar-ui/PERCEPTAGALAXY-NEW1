import { POSTS } from "./blog/posts";

export default function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://perceptagalaxy-vivekcbanakar-ui.vercel.app";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/manifesto`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/for-founders`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/free-tracker`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/login`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const competitorSlugs = ["crayon", "klue", "kompyte", "owler", "semrush", "sproutsocial", "visualping"];
  const competitorPages = competitorSlugs.map((slug) => ({
    url: `${baseUrl}/competitors/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: now })),
    ...competitorPages,
    ...blogPages,
  ];
}
