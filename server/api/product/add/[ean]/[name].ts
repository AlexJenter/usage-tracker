import fs from 'fs';

export default defineEventHandler((event) => {
    const ean = getRouterParam(event, 'ean')
    const name = getRouterParam(event, 'name')

    const productsFile = fs.readFileSync('./storage/products.json', { encoding: 'utf-8' })
    const productsData = JSON.parse(productsFile)

    if (productsData.hasOwnProperty(ean)) {
        return { status: "403 Forbidden", msg: "Already in dictionary" }
    } else {
        productsData[ean!] = name
        fs.writeFileSync(
            './storage/products.json',
            JSON.stringify(productsData, null, 4),
            { encoding: 'utf-8' }
        )
        return { status: "200 OK", ean, name }
    }
})

