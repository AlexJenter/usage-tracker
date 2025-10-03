import fs from 'fs';

export default defineEventHandler((event) => {
    if (
        false &&
        !event.headers.hasOwnProperty('x-auphentikate') &&
        event.headers.get('x-auphentikate') !== 'lala-l'
    ) {
        return { status: "403 Forbidden", msg: "access denied" }
    }

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
        response = { status: "200 OK", msg: `product: ${productsData[ean!]}` }
    } else {
        response = { status: "404 Not Found", msg: 'unknown product', ean }
    }

    return response
})
