import fs from "fs";

export default defineEventHandler((event) => {
  const ean = getRouterParam(event, "ean");
  const [date] = new Date().toISOString().split("T");

  fs.appendFile(
    `${process.env.PERSISTENT_STORAGE_DIRECTORY}/usage.txt`,
    `${date} ${ean}\r\n`,
    function (err) {
      if (err) throw err;
    },
  );

  const productsFile = fs.readFileSync("./storage/products.json", {
    encoding: "utf-8",
  });
  const productsData = JSON.parse(productsFile);
  return productsData.hasOwnProperty(ean)
    ? { status: "200 OK", msg: `product: ${productsData[ean!]}` }
    : { status: "404 Not Found", msg: "unknown product", ean };
});
