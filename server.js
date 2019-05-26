const PotusScraper = require( './crawling/potusScraper.js')
const RedditScraper = require('./crawling/redditScrapper')
// import {RedditScraper} from './crawling/redditScrapper'

const wiki = "https://en.wikipedia.org"
const pres = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

// let potus = new PotusScraper()
let rs = new RedditScraper()


// let func = async function() {

//     let promises = await potus.runner(pres, wiki)
//     Promise.all(promises).then((res) => {
//         console.log(res)
//     })
// }

let func = async function() {
    let html = await rs.success('https://www.reddit.com')
    rs.getTitles(html)
}
func()