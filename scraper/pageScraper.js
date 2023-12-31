const { json } = require('express');
const Project = require('../models/projects');
const Skill = require('../models/skills');

// To avoid saving repeted skills
async function saveSkill(skill) {
	try {
        const data = await Skill.find({title: skill});
        if (data.length === 0) {
			const newSkill = new Skill({
				title: skill
			})
			newSkill.save();
		}
	} catch (error) {
		console.log(error);
	}
}

// To avoid saving repeted projects
async function saveProject(project) {
	try {
		const { title, date, source, budget, description, url, skills } = project;
        const data = await Project.find({title: title});
		console.log('Buscando');
		console.log(title);
		console.log('Esto es lo que devuelve la búsqueda');
		console.log(data);
        if (data.length === 0 && title && description && budget) {
			// Pasamos los datos a la base de datos en Atlas
			const newProject = new Project({
				title,
				date,
				source,
				budget,
				description,
				url,
				skills
			})
			newProject.save();
		}
	} catch (error) {
		console.log(error);
	}
}

// Scraper object working on Freelance.com
// https://www.freelancer.com/jobs/3/?keyword=java
// https://www.freelancer.com/jobs/3/
// https://www.freelancer.com/jobs/
// https://www.freelancer.com/jobs/?results=100
const scraperObjectFreelancer = {
    url: 'https://www.freelancer.com/jobs/software-development',
    async scraper(browser, keyword){
		let newUrl = this.url + '?keyword=' + keyword ;
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.JobSearchCard-list');

        // Get the link to all the required books
        let urls = await page.$$eval('.JobSearchCard-primary-heading', links => {
			const regex = /\bPrivate project or contest\b/gm;
			// Filtering only projects with "budget"
            links = links.filter(link =>!link.querySelector('a').textContent.match(regex));
            links = links.map(el => el.querySelector('a').href);
            return links;
        });
        console.log(urls);

        // Loop through each of those links, open a new page instance and get the relevant data from them
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			dataObj['title'] = await newPage.$eval('.PageProjectViewLogout-header-title', text => text.textContent);
			dataObj['date'] = new Date();
			dataObj['source'] = 'freelancer';
			dataObj['budget'] = await newPage.$eval('.Grid-col--tablet-4 p', text => text.textContent);
			dataObj['description'] = await newPage.$eval('.PageProjectViewLogout-detail p:nth-child(2)', text => text.textContent);
			dataObj['url'] = link;
			dataObj['skills'] = await newPage.$$eval('.PageProjectViewLogout-detail-tags-link--highlight', skills => skills.map(el=>el.textContent.split("\n").join("").trim()));
			resolve(dataObj);

			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);

			saveProject(currentPageData);

			currentPageData.skills.forEach(skill=>{
				saveSkill(skill);
			})

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
			dataObj['date'] = new Date();
			dataObj['source'] = 'upwork';
			dataObj['budget'] = await newPage.$eval('.up-card-section ul > li:first-child strong', text => text.textContent.split("\n").join("").trim());
			dataObj['description'] = await newPage.$eval('.job-description div', text => text.textContent.split("\n").join("").trim());
			dataObj['url'] = link;
			dataObj['skills'] = await newPage.$$eval('.cfe-ui-job-skill', skills => skills.map(el=>el.textContent));
			resolve(dataObj);

			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);

			saveProject(currentPageData);

			currentPageData.skills.forEach(skill=>{
				saveSkill(skill);
			})

			console.log(currentPageData);
		}
    }
}

module.exports = {
	scraperObjectFreelancer,
	scraperObjectUpwork
} 