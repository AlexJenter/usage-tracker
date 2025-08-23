import fs from "fs";


interface RowItem {
  date: string
  name: string
  month: number
  monthName: string
}

export default defineEventHandler((event) => {
  try {
    const directory =
      "/Users/alex/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Documents/Public";
    const usageFilename = `${directory}/usage.txt`;
    const productsFilename = `${directory}/products.json`;

    const usageString = fs.readFileSync(usageFilename, "utf8");
    const productsString = fs.readFileSync(productsFilename, "utf8");
    const productsData = JSON.parse(productsString);

    const data = usageString
      .split("\n")
      .map((str) => str.split(" "))
      .map(([date, ean]) => (<RowItem>{
        date,
        month: new Date(date).getMonth(),
        monthName: new Date(date).toLocaleString("default", { month: "long" }),
        name: productsData[ean] || ""
      }))
      .reverse();

    return data
  } catch (err) {
    throw Error(err + "error fetching product names");
  }
});
