const rp = require("request-promise")
const $ = require('cheerio');

export class PotusScraper {

    _cleanArray(array) {
        let cleanedArr = array.filter((item, i) => {
            let itemNumb = parseInt(item)
            return !isNaN(itemNumb)
        })
        return cleanedArr
    }

    async scraper(url) {
        let html = await rp(url)
        const presidentElements = $('big > a', html)
        let presIndex = Object.keys(presidentElements)
        presIndex = this._cleanArray(presIndex)

        const wikiUrls = presIndex.map(i => {
            return presidentElements[i].attribs.href
        })

        return wikiUrls
    }

    async potusParse(url) {
        let html = await rp(url)
        return {
            name: $('.firstHeading', html).text(),
            birthday: $('.bday', html).text(),
        };
    };

    async runner(url1, url2) {
        let presUrls = await this.scraper(url1)
        let promRay = []
        for (let u of presUrls) {

            let p = this.potusParse(url2 + u)
            promRay.push(p)
        }
        return promRay
    }
}
