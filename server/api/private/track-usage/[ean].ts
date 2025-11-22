import fs from "fs";

import {
  defineEventHandler,
  readBody,
  getHeader,
  sendError,
  createError,
} from "h3";

export default defineEventHandler(async (event) => {
  const ean = getRouterParam(event, "ean");
  const directory = process.env.PERSISTENT_STORAGE_DIRECTORY || "./storage";

  const [date] = new Date().toISOString().split("T");
  console.log(date);

  return {
    ok: true,
    msg: "You passed the secret check 🎉 privat area",
    value: `${date} ${ean}`,
  };
});
