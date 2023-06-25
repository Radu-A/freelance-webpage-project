const browserObject = require('./browser');
const pageController = require('./pageController');

function scrap(keyword) {
    // Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    pageController(browserInstance, keyword);
}

module.exports = scrap;