const request = require('request')
const zlib = require('zlib')
const parseString = require('xml2js').parseString
let queryString = ''

if (!process.argv[2]) {
  console.log('Please enter a search query.')
  return
}

queryString = process.argv.splice(2).reduce((result, current) => {
  result += current + " "
  return result
}, '').trim()

console.log('Querying: ' + queryString)

const grabLink = (url) => {
  let flag = false
  let options = {
    method: 'GET',
    uri: url,
    gzip: true
  }
  request(options, (err, res, body) => {
    parseString(body, (err, result) => {
      if (err) {
        console.log(err)
        console.log('Link Error - Please check your url: ' + url)
        return
      }
      let items = result.urlset['url']
      items.forEach((value) => {
        if (value['image:image'] !== undefined) {
          let title = value['image:image'][0]['image:title'][0].toLowerCase()
          if (title.indexOf(queryString) > -1) {
            flag = true
            console.log('Found: ' + value['loc'][0])
            return
          }
        }
      })
      if (flag === false) {
        console.log('Not Found: ' + url)
      }
    })
  })
}

const sitemapList = ['https://kithnyc.com/sitemap_products_1.xml', 'https://noirfonce.eu/sitemap_products_1.xml', 'https://shop.bdgastore.com/sitemap_products_1.xml','https://rockcitykicks.com/sitemap_products_1.xml', 'https://www.featuresneakerboutique.com/sitemap_products_1.xml', 'https://cityblueshop.com/sitemap_products_1.xml', 'https://www.highsandlows.net.au/sitemap_products_1.xml', 'https://lapstoneandhammer.com/sitemap_products_1.xml', 'https://www.bowsandarrowberkeley.com/sitemap_products_1.xml', 'https://www.rimenyc.com/sitemap_products_1.xml', 'https://offthehook.ca/sitemap_products_1.xml', 'https://www.12amrun.com/sitemap_products_1.xml', 'https://wishatl.com/sitemap_products_1.xml', 'https://burnrubbersneakers.com/sitemap_products_1.xml', 'https://suede-store.com/sitemap_products_1.xml', 'https://www.notre-shop.com/sitemap_products_1.xml', 'https://shoegallerymiami.com/sitemap_products_1.xml', 'https://www.solestop.com/sitemap_products_1.xml', 'https://www.bbbranded.com/sitemap_products_1.xml']

sitemapList.forEach((url) => {
  grabLink(url)
})
