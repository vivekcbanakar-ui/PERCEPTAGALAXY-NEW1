export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://perceptagalaxy-vivekcbanakar-ui.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/checkout"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
