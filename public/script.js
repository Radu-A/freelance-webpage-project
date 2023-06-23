
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



//USER - Siendo usuario, editar mis propios datos mostrados en profile:
const formUserData = document.getElementById("formUserData");
const editUserData = document.getElementById("editUserData");


if (formUserData){
editUserData.addEventListener("click", function(event) {
    event.preventDefault();

    const form = document.createElement("form");
    const id_userInput = document.createElement("input");
    const passwordInput = document.createElement("input");
    const emailInput = document.createElement("input");
    const userNameInput = document.createElement("input");
    const firstNameInput = document.createElement("input");
    const surnameInput = document.createElement("input");
    const submitButton = document.createElement("button");

    id_userInput.type = "number";
    id_userInput.placeholder = "id --> Just for tests";
    id_userInput.name = "id_user";
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
  
    form.appendChild(id_userInput);
    form.appendChild(passwordInput);
    form.appendChild(emailInput);
    form.appendChild(userNameInput);
    form.appendChild(firstNameInput);
    form.appendChild(surnameInput);
    form.appendChild(submitButton);
  
    formUserData.appendChild(form);
  
    // Send user info event
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let newInfo = {
          id_user: e.target.id_user.value,
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


if(window.location.pathname == "/favs"){ //Check the visited page
	
}

async function getFavouriteProjectsInfo(id_user){
	try {
		let id_user = 10;
		let data = await getData(`http://localhost:3000/api/users/favs/${id_user}`); 
		console.log("Data from favs: ", data)
	} catch (error) {
		console.error(error);
	}
}






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
			<h2>${project.title}</h2>
		</div>
		<div class="project-description">
			<p>${project.description}</p>
		</div>
		<div class="project-budget">
			<p>${project.budget}</p>
		</div>
		<div class="project-buttons">
			<button id="addFav">Add to favourites</button>
		</div>`;
		
		searchResultsSection.appendChild(articleProjectCard);

		let addFavButton = document.querySelector(`#project-card-${i+1} div.project-buttons button#addFav`);
		addFavButton.addEventListener("click", (event) => {
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

async function printDetail(projects, i) {
	dashboardResultsSection.innerHTML = `
	<article>
		<h1>Project edition</h1>
		<button id='back-dashboard'>Back to dashboard</button>
	</article>
	<article>
		<div class="detail-title">
			<h2>${projects[i].title}</h2>
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
	// getAndAwaitProjects();
	const createButtonArticle = document.createElement('article');
	createButtonArticle.innerHTML = `
	<article>
		<button id='create-project'>Create project</button>
	</article>`;
	dashboardResultsSection.appendChild(createButtonArticle);
	createButtonArticle.addEventListener('click', ()=>{
		dashboardResultsSection.innerHTML = `
		<h3>Create new project</h3>
		<form id="create-project-form" action="">
			<input id="create-title" type="text" name="title" placeholder="Title">
			<textarea id="create-description" name="description" cols="30" rows="10" placeholder="Description"></textarea>
			<input id="create-budget" type="edit-budget" name="budget" placeholder="Budget">
			<button id="create-save" type="submit">Save</button>
		</form>`;
		const createProjectForm = document.getElementById('create-project-form');
		createProjectForm.addEventListener('submit', (event)=>{
			event.preventDefault();
			const createTitle = document.getElementById('create-title').value;
			const createDescription = document.getElementById('create-description').value;
			const createBudget = document.getElementById('create-budget').value;

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
	getProjects().then(projects=>{
		const projectCardArticle =  document.querySelectorAll('.project-card');
		projectCardArticle.forEach((article, i)=>{
			article.addEventListener('click', () => {
				printDetail(projects, i);
			})
		})
	})
}