// Referral code utilities — generate, validate, attribute

// Generate a friendly 6-char referral code (e.g., "VIVEK-X7Q2")
export function generateReferralCode(seed = "") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No 0/O/1/I for clarity
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return seed ? `${seed.toUpperCase().slice(0, 4)}-${code}` : code;
}

// Build referral URL
export function buildReferralUrl(baseUrl, code) {
  return `${baseUrl}/signup?ref=${code}`;
}
