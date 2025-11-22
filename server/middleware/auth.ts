// server/middleware/auth.ts
import { defineEventHandler, getHeader, sendError, createError } from "h3";

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  if (!path.startsWith("/api/mutate")) return;

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
        message: "Missing or invalid API key",
      }),
    );
  }
});
