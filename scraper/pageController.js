const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, keyword){
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser, keyword);
    } catch (error) {
        console.log("Could not resolve the browser instance => ", error);
    }
}

module.exports = (browserInstance, keyword) => scrapeAll(browserInstance, keyword)