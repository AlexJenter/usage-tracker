// server/api/register/[ean].ts
import fs from "fs";

export default defineEventHandler((event) => {
  const ean = <string>getRouterParam(event, "ean");
  if (!ean) return;

  const name = <string>getRouterParam(event, "name");
  if (!name) return;

  const directory = process.env.PERSISTENT_STORAGE_DIRECTORY || "./storage";
  const productsFilename = `${directory}/products.json`;

  const productsFile = fs.readFileSync(productsFilename, {
    encoding: "utf-8",
  });
  const productsData = JSON.parse(productsFile);

  if (productsData.hasOwnProperty(ean)) {
    return `i already have ${ean} stored as ${productsData[ean]}`;
  } else {
    const newProductsDataString = JSON.stringify(
      { ...productsData, [ean]: name },
      null,
      4,
    );
    fs.writeFileSync(productsFilename, newProductsDataString);
    return `i now have ${ean} stored as ${name}`;
  }
});
