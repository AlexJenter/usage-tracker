// server/api/secret-stuff.post.ts
import {
  defineEventHandler,
  readBody,
  getHeader,
  sendError,
  createError,
} from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ ean: string }>(event);

  console.log("BODY:", body);

  return {
    ok: true,
    msg: "You passed the secret check 🎉 privat area",
  };
});
