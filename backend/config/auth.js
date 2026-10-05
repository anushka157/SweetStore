const { createHmac } = require("crypto");

// Existing role-specific keys take precedence. Replit's session secret can
// supply separate signing keys for local development without hardcoded keys.
for (const key of [
  "JWT_SECRET_PRIVATE_KEY",
  "JWT_SECRET_CUSTOMER_PRIVATE_KEY",
  "JWT_ADMIN_PRIVATE_KEY",
  "JWT_DELIVERY_PARTNER_PRIVATE_KEY",
]) {
  if (!process.env[key] && process.env.SESSION_SECRET) {
    process.env[key] = createHmac("sha256", process.env.SESSION_SECRET)
      .update(`sweetstore:${key}`)
      .digest("hex");
  }
  if (!process.env[key]) {
    throw new Error(`Configure ${key} or SESSION_SECRET before starting the API.`);
  }
}
