import {PotusScraper} from './crawling/potusScraper.js'
import {RedditScraper} from './crawling/redditScrapper'

const wiki = "https://en.wikipedia.org"
const pres = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

let potus = new PotusScraper()
let rs = new RedditScraper()


// let func = async () => {

//     let promises = await potus.runner(pres, wiki)
//     Promise.all(promises).then((res) => {
//         console.log(res)
//     })
// }
// func()

let func = async() => {
    let html = await rs.success()
    rs.getTitles(html)
}
func()