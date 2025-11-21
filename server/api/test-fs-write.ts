import fs from "fs";

export default defineEventHandler((event) => {
  try {
    const directory = "/app/data";
    const filePath = `${directory}/usage.txt`;
    fs.appendFileSync(filePath, "hello");
    return filePath;
  } catch (err) {
    throw Error(err + "error fetching product names");
  }
});
