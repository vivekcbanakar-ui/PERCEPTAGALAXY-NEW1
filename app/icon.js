// Generate a simple SVG-based favicon and OG image
// Using SVG keeps it lightweight and renders perfectly at any size

export const size = { width: 32, height: 32 };

export default function Icon() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#9333ea" />
          <stop offset="100%" style="stop-color:#ec4899" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#grad)" />
      <text x="16" y="22" font-family="-apple-system, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">✨</text>
    </svg>`,
    { headers: { "Content-Type": "image/svg+xml" } }
  );
}
