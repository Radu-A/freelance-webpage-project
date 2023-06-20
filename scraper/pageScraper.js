const Project = require('../models/projects');

// Scraper object working on Freelance.com
const scraperObjectFreelancer = {
    url: 'https://www.freelancer.com/jobs/',
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
			// let descriptionParagraphs = await newPage.$$eval('.PageProjectViewLogout-detail p', paragraphs => {
			// 	paragraphs.forEach(paragraph => console.log(paragraph));
			// })
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

// Scraper object from upwork.com
const scraperObjectUpwork = {
    url: 'https://www.upwork.com/freelance-jobs/application-programming/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.container-visitor');
        // Get the link to all the required books
        let urls = await page.$$eval('.job-tile-content', links => {
			// Filtering only projects with "budget"
			const regex = /^\s*\$/gm;
            links = links.filter(link =>link.querySelector('div.row p:first-child strong').textContent.match(regex));
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
			dataObj['title'] = await newPage.$eval('h1', text => text.textContent.split("\n").join("").trim());
			dataObj['budget'] = await newPage.$eval('.up-card-section ul > li:first-child strong', text => text.textContent.split("\n").join("").trim());
			// let descriptionParagraphs = await .split("    ").join("")newPage.$$eval('.PageProjectViewLogout-detail p', paragraphs => {
			// 	paragraphs.forEach(paragraph => console.log(paragraph));
			// })
			dataObj['description'] = await newPage.$eval('.job-description div', text => text.textContent.split("\n").join("").trim());
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

module.exports = scraperObjectUpwork;