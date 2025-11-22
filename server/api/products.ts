import fs from "fs";

export default defineEventHandler((event) => {
  try {
    const directory = process.env.PERSISTENT_STORAGE_DIRECTORY || "./storage";
    const productsFilename = `${directory}/products.json`;
    const productsString = fs.readFileSync(productsFilename, "utf8");
    const productsData = JSON.parse(productsString);

    return productsData;
  } catch (err) {
    throw Error(err + "error fetching product names");
  }
});
