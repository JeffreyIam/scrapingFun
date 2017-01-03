const request = require('request')
const zlib = require('zlib')
const parseString = require('xml2js').parseString
let queryString = ''

if (!process.argv[2]) {
  console.log('Please enter a search query.')
  return
}

queryString = process.argv.splice(2).reduce(function(result, current) {
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
    parseString(body, function(err, result) {
      if (err) {
        console.log(err)
        console.log('Link Error - Please check your url: ' + url)
        return
      }
      let items = result.urlset['url']
      items.forEach(function(value, index) {
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

grabLink('https://kithnyc.com/sitemap_products_1.xml')
grabLink('https://noirfonce.eu/sitemap_products_1.xml')
grabLink('https://shop.bdgastore.com/sitemap_products_1.xml')
grabLink('https://rockcitykicks.com/sitemap_products_1.xml')
grabLink('https://www.featuresneakerboutique.com/sitemap_products_1.xml')
grabLink('https://cityblueshop.com/sitemap_products_1.xml')
grabLink('https://www.highsandlows.net.au/sitemap_products_1.xml')
grabLink('https://lapstoneandhammer.com/sitemap_products_1.xml')
grabLink('https://www.bowsandarrowberkeley.com/sitemap_products_1.xml')
grabLink('https://www.rimenyc.com/sitemap_products_1.xml')
grabLink('https://offthehook.ca/sitemap_products_1.xml')
grabLink('https://www.12amrun.com/sitemap_products_1.xml')
grabLink('https://wishatl.com/sitemap_products_1.xml')
grabLink('https://burnrubbersneakers.com/sitemap_products_1.xml')
grabLink('https://suede-store.com/sitemap_products_1.xml')
grabLink('https://www.notre-shop.com/sitemap_products_1.xml')
grabLink('https://shoegallerymiami.com/sitemap_products_1.xml')
grabLink('https://www.solestop.com/sitemap_products_1.xml')
grabLink('https://www.bbbranded.com/sitemap_products_1.xml')
