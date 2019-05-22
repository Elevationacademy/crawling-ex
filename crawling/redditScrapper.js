const rp = require('request-promise');
const url = 'https://www.reddit.com';
const puppeteer = require('puppeteer')
const fs = require('fs')
const $ = require('cheerio');


export class RedditScraper {
    async failure () {
        let html = await rp(url)
        fs.writeFile('./reddit.html', html, () => {
            console.log(done)
        })
    }
    
    async success () {
        let browser = await puppeteer.launch()
        let page = await browser.newPage()
        await page.goto(url)
        fs.writeFile('./reddit.png', await page.screenshot(), () => {
            console.log("snap")
        })

        let html = await page.content()
      
        // fs.writeFile('./reddit.html', html, () => {
        //     console.log("dern")
        // });
        return html
    }

    getTitles (html) {
        $('h2', html).each(function() {
            console.log($(this).text());
          });
    }
}
