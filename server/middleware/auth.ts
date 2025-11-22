// server/middleware/auth.ts
import { defineEventHandler, getHeader, sendError, createError } from "h3";

export default defineEventHandler((event) => {
  // Only protect certain paths
  if (!event.path.startsWith("/api")) return;

  const expected = process.env.API_KEY;
  const provided =
    getHeader(event, "x-api-key") ||
    getHeader(event, "authorization")?.replace(/^Bearer\s+/i, "");

  if (!expected || provided !== expected) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }),
    );
  }
});
