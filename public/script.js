// REQUESTS
//GETs
async function getData(url = "") {
    let response = await fetch(url, {
      method: "GET"
    });
    return response.json();
}
//PUTs
async function putData(url = "", data = {}) {
    // Default options are marked with *
    let response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
    return response.json(); // parses JSON response into native JavaScript objects
}
//POSTs
async function postData(url = "", data = {}) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
}
//DELETEs
async function deleteData(url = "", data = {}) {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
}



//USER - Siendo usuario, editar mis propios datos mostrados en profile:
const formUserData = document.getElementById("formUserData");
const editUserData = document.getElementById("editUserData");


if (formUserData){
editUserData.addEventListener("click", function(event) {
    event.preventDefault();

    const form = document.createElement("form");
	form.setAttribute("id", "editUserDataForm");
    const passwordInput = document.createElement("input");
    const emailInput = document.createElement("input");
    const userNameInput = document.createElement("input");
    const firstNameInput = document.createElement("input");
    const surnameInput = document.createElement("input");
    const submitButton = document.createElement("button");

    passwordInput.type = "password";
    passwordInput.placeholder = "password";
    passwordInput.name = "password";
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    emailInput.name = "email";
    userNameInput.type = "text";
    userNameInput.placeholder = "User Name";
    userNameInput.name = "userName";
    firstNameInput.type = "text";
    firstNameInput.placeholder = "First Name";
    firstNameInput.name = "firstName";
    surnameInput.type = "text";
    surnameInput.placeholder = "Surname";
    surnameInput.name = "surname";
  
    submitButton.type = "submit";
    submitButton.innerText = "Save edit";
  
    form.appendChild(passwordInput);
    form.appendChild(emailInput);
    form.appendChild(userNameInput);
    form.appendChild(firstNameInput);
    form.appendChild(surnameInput);
    form.appendChild(submitButton);
  
    formUserData.appendChild(form);

	/* Eliminar el event listener después de que se haya ejecutado 
		xa evitar que se creen n formularios si se clica n veces el botón.
	*/
	editUserData.removeEventListener("click", arguments.callee);
  
    // Send user info event
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let newInfo = {
          email: e.target.email.value,
          password: e.target.password.value,
          userName: e.target.userName.value,
          firstName: e.target.firstName.value,
          sureName: e.target.surname.value
      }
  
      try {
          putData("http://localhost:3000/api/users/user", newInfo).then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          }); 
      } catch (error) {
          console.error(error);
      }
    });
  

});
}


async function getFavouriteProjectsInfo(){
	try {
		//gets user's favourite projects ids
		let favouritesIds = await getData(`http://localhost:3000/api/users/favs/`);
		let paramValue = favouritesIds.project_ids.toString();

		//gets favourite projects Info
		let favouritesInfo = await getData(`http://localhost:3000/api/projects/${paramValue}`);
		console.log("Favs data from script.js: ", favouritesInfo)
		
		//prints favourite projects cards
		printProjectCard(favouritesInfo);
	} catch (error) {
		console.error(error);
	}
}

if(window.location.pathname == "/favs"){
	getFavouriteProjectsInfo();
}


async function setHeader () {
	let userInfo = await getData("http://localhost:3000/api/users/user");
	let {id_user, email, password, user_name, admin, firstname, surename, logged} = userInfo;
	if(admin && logged){
		//admin navBar
		
	} else if (!admin && logged) {
		//user navBar

	} else {
		//not logged in

	}
}
//setHeader ()



// ---------------SEARCH PROJECTS------------------
const searchResultsSection = document.querySelector('.search-results');
const searchProjectsForm = document.querySelector('#search-projects');

// It prints project card
function printProjectCard(projects) {
	projects.forEach((project, i)=>{
		project.description = project.description.substr(0,550);

		const articleProjectCard = document.createElement('article');
		articleProjectCard.classList.add('project-card');
		articleProjectCard.id = `project-card-${i+1}`
		articleProjectCard.innerHTML = `
		<div class="project-title">
			<h2><a href="${project.url}">${project.title}</a></h2>
		</div>
		<div class="project-description">
			<p>${project.description}</p>
		</div>
		<div class="project-budget">
			<p>${project.budget}</p>
		</div>
		<div class="project-buttons">
			<button id="add_delete"></button>
		</div>`;
		
		const projectSkillsDiv = document.createElement('div');
		projectSkillsDiv.classList.add('project-skills');
		project.skills.forEach((skill, i)=>{
			if (i < 6) {
				const skillParagraph = document.createElement('p');
				skillParagraph.innerText = skill;
				projectSkillsDiv.appendChild(skillParagraph);
			}
		})
		articleProjectCard.appendChild(projectSkillsDiv);
		searchResultsSection.appendChild(articleProjectCard);

		let addDeleteButton = document.querySelector(`#project-card-${i+1} div.project-buttons button#add_delete`);

		if(window.location.pathname == "/"){ //Check the visited page
			addDeleteButton.textContent = "Add to favourites";
			addDeleteButton.addEventListener("click", (event) => {
				event.preventDefault();
				let favouriteInfo = {
					"id_user": 10,
					"id_project": project._id
				};
				try {
					postData("http://localhost:3000/api/users/favs", favouriteInfo).then((data) => {
					console.log("Post from script.js: ", data);
					}); 
				} catch (error) {
					console.error(error);
				}
			})
		};

		if(window.location.pathname == "/favs"){ //Check the visited page
			addDeleteButton.textContent = "Delete from favourites";
			addDeleteButton.addEventListener("click", (event) => {
				event.preventDefault();
				let favouriteInfo = {
					"id_user": 10,
					"id_project": project._id
				};
				try {
					deleteData("http://localhost:3000/api/users/favs", favouriteInfo).then((data) => {
					console.log("Post from script.js: ", data);
					}); 

					articleProjectCard.remove();
				} catch (error) {
					console.error(error);
				}
			})
		}
	});
}
// It search projects
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
// If search-projects-form exists, add submit event listener
if (searchProjectsForm) {
	searchProjectsForm.addEventListener('submit', (event) => {
		event.preventDefault();
	
		searchResultsSection.innerHTML = '';
		const keywordInput = document.querySelector('#keyword');
		getProjects(keywordInput.value);
	})
}



// -------------------DASHBOARD-------------------------------
// http://localhost:3000/dashboard
const dashboardResultsSection = document.querySelector('.dashboard');

async function printDashboardDetail(projects, i) {
	dashboardResultsSection.innerHTML = `
	<article>
		<h1>Project edition</h1>
		<button id='back-dashboard'>Back to dashboard</button>
	</article>
	<article>
		<div class="detail-title">
			<h2><a href="${projects[i].url}">${projects[i].title}</a></h2>
		</div>
		<div class="detail-description">
			<p>${projects[i].description}</p>
		</div>
		<div class="detail-budget">
			<p>${projects[i].budget}</p>
		</div>
	</article>
	<article>
		<button id='edit-project'>Edit</button>
		<button id='delete-project'>Delete</button>
	</article>`;
	// Back button
	const backDashboardButton = document.getElementById('back-dashboard');
	backDashboardButton.addEventListener('click', ()=> {
		location.reload();
	});
	// Delete button
	const deleteProjectButton = document.getElementById('delete-project');
	deleteProjectButton.addEventListener('click', ()=> {
		console.log(projects[i]._id)
		fetch(`http://localhost:3000/api/projects/project/${projects[i]._id}`, {
			method: 'DELETE',
		  })
		  .then(location.reload())
		  .catch(error=>console.log(error));
	});
	// Edit button
	const editProjectButton = document.getElementById('edit-project');
	editProjectButton.addEventListener('click', (event)=> {
		event.preventDefault();
		const editProjectArticle = document.createElement('article');
		editProjectArticle.id = 'edit-project-article';
		editProjectArticle.innerHTML = `
		<h3>Edit project</h3>
		<form id="edit-project-form" action="">
			<input id="edit-title" type="text" name="title" value="${projects[i].title}">
			<textarea id="edit-description" name="description" cols="30" rows="10">${projects[i].description}</textarea>
			<input id="edit-budget" type="edit-budget" name="budget" value="${projects[i].budget}">
			<button id="edit-save" type="submit">Save</button>
		</form>`;
		dashboardResultsSection.appendChild(editProjectArticle);
		editProjectButton.disabled = true;


		const editProjectForm = document.getElementById('edit-project-form');
		editProjectForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const editTitle = document.getElementById('edit-title').value;
			const editBudget = document.getElementById('edit-budget').value;
			const editDescription = document.getElementById('edit-description').value;


			fetch(`http://localhost:3000/api/projects/project`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					"_id": projects[i]._id,
					"title": editTitle, 
					"budget": editBudget, 
					"description": editDescription
				})
			})
			.then(window.location.reload())
			.catch(error=>console.log(error));
		})
	})
}

if (dashboardResultsSection) {
	const updateResultsButton = document.createElement('article');
	updateResultsButton.innerHTML = `
	<article>
		<button id='update-results-button'>Update results</button>
	</article>`
	dashboardResultsSection.appendChild(updateResultsButton);
	updateResultsButton.addEventListener('click', ()=>{
		fetch(`http://localhost:3000/api/projects/search/scrap`).catch(error=>console.log(error));
	})


	// To create "create-project" button
	const createButtonArticle = document.createElement('article');
	createButtonArticle.innerHTML = `
	<article>
		<button id='create-project'>Create project</button>
	</article>`;
	dashboardResultsSection.appendChild(createButtonArticle);
	// To manage the event of "create-project" button
	createButtonArticle.addEventListener('click', ()=>{
		// To print "create-project-form"
		dashboardResultsSection.innerHTML = `
		<h3>Create new project</h3>
		<form id="create-project-form" action="">
			<input id="create-title" type="text" name="title" placeholder="Title">
			<textarea id="create-description" name="description" cols="30" rows="10" placeholder="Description"></textarea>
			<input id="create-budget" type="edit-budget" name="budget" placeholder="Budget">
			<button id="create-save" type="submit">Save</button>
		</form>`;
		const createProjectForm = document.getElementById('create-project-form');
		// To manage the event of "create-project-form"
		createProjectForm.addEventListener('submit', (event)=>{
			event.preventDefault();
			const createTitle = document.getElementById('create-title').value;
			const createDescription = document.getElementById('create-description').value;
			const createBudget = document.getElementById('create-budget').value;
			// To save data on MongoDB
			fetch(`http://localhost:3000/api/projects/project`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					"title": createTitle, 
					"budget": createBudget, 
					"description": createDescription
				})
			})
			.then(window.location.reload())
			.catch(error=>console.log(error));
		})
	})
	// It print all projects
	getProjects().then(projects=>{
		const projectCardArticle =  document.querySelectorAll('.project-card');
		projectCardArticle.forEach((article, i)=>{
			article.addEventListener('click', () => {
				printDashboardDetail(projects, i);
			})
		})
	})
}