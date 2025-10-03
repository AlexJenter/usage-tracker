import fs from 'fs';

export default defineEventHandler((event) => {

    const ean = getRouterParam(event, 'ean')
    const date = new Date().toISOString().split("T")[0];

    fs.appendFile(
        './storage/usage.txt',
        `${date} ${ean}\n`,
        function (err) { if (err) throw err; }
    );

    const productsFile = fs.readFileSync('./storage/products.json', { encoding: 'utf-8' })
    const productsData = JSON.parse(productsFile)

    let response
    if (productsData.hasOwnProperty(ean)) {
        response = { status: "found", msg: `product: ${productsData[ean]}` }
    } else {
        response = { status: "unknown", msg: 'unknown product', ean }
    }

    return response
})
