const rp = require("request-promise")
const $ = require('cheerio');

module.exports =  class PotusScraper {

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
        console.log(wikiUrls)
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
        let promiseArray = []
        for (let u of presUrls) {

            let p = this.potusParse(url2 + u)
            promiseArray.push(p)
        }
        return promiseArray
    }
}

// let ps = new PotusScraper()
// // ps.scraper('https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States')
// ps.potusParse('https://en.wikipedia.org/wiki/George_Washington')