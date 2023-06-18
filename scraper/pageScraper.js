const Project = require('../models/projects');

const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');
        // Get the link to all the required books
        let urls = await page.$$eval('section ol > li', links => {
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        });
        console.log(urls);

        // Loop through each of those links, open a new page instance and get the relevant data from them
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
			dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
			dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
				// Strip new line and tab spaces
				text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
				// Get the number of stock available
				let regexp = /^.*\((.*)\).*$/i;
				let stockAvailable = regexp.exec(text)[1].split(' ')[0];
				return stockAvailable;
			});
			dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
			dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
			dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
			resolve(dataObj);
			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);
			console.log(currentPageData);
		}
    }
}
const scraperObjectFreelancer = {
    url: 'https://www.freelancer.es/jobs/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.JobSearchCard-list');
        // Get the link to all the required books
        let urls = await page.$$eval('.JobSearchCard-primary-heading', links => {
            // links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('a').href)
            return links;
        });
        console.log(urls);

        // Loop through each of those links, open a new page instance and get the relevant data from them
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			dataObj['title'] = await newPage.$eval('h1', text => text.textContent);
			dataObj['budget'] = await newPage.$eval('.Grid-col--tablet-4 p', text => text.textContent);
			dataObj['description'] = await newPage.$eval('.PageProjectViewLogout-detail p:nth-child(2)', text => text.textContent);
			// dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
			resolve(dataObj);

			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);

			// Pasamos los datos a la base de datos en Atlas
			const { title, budget, description } = currentPageData;
			const newProject = new Project({
				title,
				budget,
				description
			})
			newProject.save();

			console.log(currentPageData);
		}
    }
}

module.exports = scraperObjectFreelancer;