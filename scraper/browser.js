const puppeteer = require('puppeteer');
require('dotenv').config();

async function startBrowser(){
    let browser;
    try {
        console.log("Opening the browser.....");
        browser = await puppeteer.launch(
            {   args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
                executablePath:
                process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath()  
        })
    } catch (error) {
        console.log("Could not create a browser instance => : ", error);
    }
    return browser;
}

module.exports = {
    startBrowser
};