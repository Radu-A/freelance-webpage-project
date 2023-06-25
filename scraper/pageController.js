const pageScraper = require('./pageScraper');

const keywordList = ['linux', 'cplusplus-programming', 'c-sharp-programming', 'objective-c', 'ruby-on-rails', 'python', 'java']
const skillsList = ['Linux', 'C++ Programming', 'C# Programming', 'Objective C', 'Ruby on Rails', 'Python', 'Java']

async function scrapeAll(browserInstance, keyword){
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraperObjectFreelancer.scraper(browser, keyword);
        await pageScraper.scraperObjectUpwork.scraper(browser, keyword);
    } catch (error) {
        console.log("Could not resolve the browser instance => ", error);
    }
}

module.exports = (browserInstance, keyword) => scrapeAll(browserInstance, keyword)