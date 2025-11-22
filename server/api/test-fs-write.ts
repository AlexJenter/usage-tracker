import fs from "fs";

export default defineEventHandler((event) => {
  try {
    const directory = process.env.PERSISTENT_STORAGE_DIRECTORY || "./storage";
    const filePath = `${directory}/usage_testing.txt`;
    fs.appendFileSync(filePath, "hello\r\n");
    return filePath;
  } catch (err) {
    throw Error(err + "error fetching product names");
  }
});
