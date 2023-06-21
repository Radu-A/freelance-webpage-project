//LOGUEARSE CON GOOGLE
function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	// Enviar el token al servidor para verificar la autenticación
    // ...
}

// ---------------SEARCH PROJECTS------------------
const searchResultsSection = document.querySelector('.search-results');
const searchProjectsForm = document.querySelector('#search-projects');

// It prints project card
function printProjectCard(projects) {
	projects.forEach(project=>{
		project.description = project.description.substr(0,550);

		const articleProjectCard = document.createElement('article');
		articleProjectCard.classList.add('.project-card');
		articleProjectCard.innerHTML = `
		<div class="project-title">
			<h2>${project.title}</h2>
		</div>
		<div class="project-description">
			<p>${project.description}</p>
		</div>
		<div class="project-budget">
			<p>${project.budget}</p>
		</div>`
		searchResultsSection.appendChild(articleProjectCard);
	});
}


async function getProjects(keyword) {
	if (keyword) {
		try {
			const response = await fetch(`http://localhost:3000/api/projects/search?keyword=${keyword}?`);
			let projects = await response.json();
			printProjectCard(projects);
			return projects;
		} catch (error) {
			console.error(`ERROR: ${error.stack}`);
		}
	} else {
		try {
			const response = await fetch(`http://localhost:3000/api/projects/search`);
			let projects = await response.json();
			printProjectCard(projects);
			return projects;
		} catch (error) {
			console.error(`ERROR: ${error.stack}`);
		}
	}
}

searchProjectsForm.addEventListener('submit', (event) => {
	event.preventDefault();

	searchResultsSection.innerHTML = '';
	const keywordInput = document.querySelector('#keyword');
	getProjects(keywordInput.value);
})
