const pageScraper = require('./pageScraper');

const keywordList = ['linux', 'cplusplus-programming', 'c-sharp-programming', 'objective-c', 'ruby-on-rails', 'python', 'java', 'php', 'javascript', 'dot-net', 'css', 'amazon-web-services', 'html5', 'wordpress'];

const skillsList = ['Linux', 'C++ Programming', 'C# Programming', 'Objective C', 'Ruby on Rails', 'Python', 'Java', 'PHP', 'JavaScript', '.NET', 'CSS', 'Amazon Web Services', 'HTML5', 'WordPress'];


async function scrapeAll(browserInstance, keyword){
    let browser;
    try {
        browser = await browserInstance;


        await pageScraper.scraperObjectUpwork.scraper(browser, keyword);
        await pageScraper.scraperObjectFreelancer.scraper(browser, keyword);
    } catch (error) {
        console.log("Could not resolve the browser instance => ", error);
    }
}

module.exports = (browserInstance, keyword) => scrapeAll(browserInstance, keyword)