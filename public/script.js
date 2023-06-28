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

	editUserData.innerText = 'Back';

	editUserData.addEventListener('click', (event)=>{
		event.preventDefault();

		window.location.reload();
	})

	const userInfoName = document.getElementById('profile-info-name').textContent;
	const userInfoEmail = document.getElementById('profile-info-email').textContent;
	const userInfoFirstname = document.getElementById('profile-info-firstname').textContent;
	const userInfoSurename = document.getElementById('profile-info-surename').textContent;



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
	emailInput.value = userInfoEmail;
    userNameInput.type = "text";
    userNameInput.placeholder = "User Name";
    userNameInput.name = "userName";
	userNameInput.value = userInfoName;
    firstNameInput.type = "text";
    firstNameInput.placeholder = "First Name";
    firstNameInput.name = "firstName";
	firstNameInput.value = userInfoFirstname;
    surnameInput.type = "text";
    surnameInput.placeholder = "Surname";
    surnameInput.name = "surname";
	surnameInput.value = userInfoSurename;
  
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
          putData("https://freelance-webpage-1-1.onrender.com/api/users/user", newInfo).then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          }); 
      } catch (error) {
          console.error(error);
      }
    });
});
}



function signUpFormValidation(email, password, user_name, firstname, surename){
	//Regex
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const userNameRegex = /^[a-zA-Z0-9_]{2,15}$/;
	const firstNameRegex = /^[a-zA-Z]{0,20}$/;

	let result;
	let validate = true;
	let msg = "Form fields validation failed: ";
	console.log(email, password, user_name, firstname, surename);
	console.log(emailRegex.test(email));
	console.log(passwordRegex.test(password));
	console.log(userNameRegex.test(user_name));
	console.log(userNameRegex.test(firstname));
	console.log(userNameRegex.test(surename));
	//Tests
	if(!emailRegex.test(email)){
		validate = false;
		msg += "invalid email format; ";
	}
	if(!passwordRegex.test(password)){
		validate = false;
		msg += "invalid password format: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character; ";
	}
	if(!userNameRegex.test(user_name)){
		validate = false;
		msg += "invalid user name: Minimum 5 characters, maximum 15 characters, lowercase, uppercase, numbers, underscore; ";
	}
	if(!firstNameRegex.test(firstname)){
		validate = false;
		msg += "invalid first name: Minimum 5 characters, maximum 20 characters, lowercase or uppercase; ";
	}
	if(!firstNameRegex.test(surename)){
		validate = false;
		msg += "invalid surname: Minimum 5 characters, maximum 20 characters, lowercase or uppercase; ";
	}

	validate ?
	result = {validate, msg: "successful validation"} 
	: {validate, msg};

	return result
}

const signUpForm = document.getElementById("signup_form");
if(signUpForm){
	signUpForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		
		email = e.target.email.value,
		password = e.target.password.value,
		user_name = e.target.user_name.value,
		admin = false,
		firstname = e.target.firstname.value,
		surename = e.target.surename.value,
		logged = false

		let validation = signUpFormValidation(email, password, user_name, firstname, surename);
		console.log(validation)
		if(validation.validate){
			try {
				let newInfo = {email,password,user_name,admin,firstname,surename,logged};

				// response --> {"success": false, "msj":"This email do not have an account"}
				let response = await postData("https://freelance-webpage-1-1.onrender.com/auth/signup", newInfo);

				if(response.success){
					window.location = "/";
				} else {
					console.log("Something went wrong")
				}
			} catch (error) {
				//console.log(error);
			}
		} else {
			alert(validation.msg);
		}
		
	  });
}

const loginForm = document.getElementById("login_form");
if(loginForm){
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		
		let newInfo = {
			email: e.target.email.value,
			password: e.target.password.value
		}

		try {
			// response --> {"success": false, "msj":"This email do not have an account"}
			let response = await postData("https://freelance-webpage-1-1.onrender.com/auth/login", newInfo);
			
			if(response.success){
				window.location = "/";
			} else {
				console.log("Account not found");
				window.location = "/signup"; 
			}

		} catch (error) {
			console.log(error);
		}
	  });

}


async function getFavouriteProjectsInfo(){
	try {
		//gets user's favourite projects ids
		let favouritesIds = await getData(`https://freelance-webpage-1-1.onrender.com/api/users/favs/`);
		let paramValue = favouritesIds.project_ids.toString();

		//gets favourite projects Info
		let favouritesInfo = await getData(`https://freelance-webpage-1-1.onrender.com/api/projects/${paramValue}`);
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

// Set the header according to the user (no logged, logged in, admin)
async function setHeader() {
	let userInfo = await getData("https://freelance-webpage-1-1.onrender.com/api/users/user");

	let header;
	if (userInfo.data.email){
		let { id_user, email, password, user_name, admin, firstname, surename, logged } = userInfo.data;

		if (admin && logged) {
			// admin logged in
			header = `
			  <section class="top-nav">
				<div id="logo"></div>
				<p id="logotitle"><a href="https://freelance-webpage-1-1.onrender.com/">Freelance Web Projects</a></p>
				<input id="menu-toggle" type="checkbox"/>
				<label class="menu-button-container" for="menu-toggle">
				  <div class="menu-button"></div>
				</label>
				<ul class="menu">
				  <li class="menu-item"><a class="menu-link" href="/">Index</a></li>
				  <li class="menu-item"><a class="menu-link" href="/dashboard">Dashboard</a></li>
				  <li class="menu-item"><a class="menu-link" href="/logout">Logout</a></li>
				</ul>
			  </section>
			`;
		  } else {
			// User logged in
			header = `
			  <section class="top-nav">
			  	<div id="logo"></div>
			  	<p id="logotitle"><a href="https://freelance-webpage-1-1.onrender.com/">Freelance Web Projects</a></p>
				<input id="menu-toggle" type="checkbox"/>
				<label class="menu-button-container" for="menu-toggle">
				  <div class="menu-button"></div>
				</label>
				<ul class="menu">
				  <li class="menu-item"><a class="menu-link" href="/">Index</a></li>
				  <li class="menu-item"><a class="menu-link" href="/profile">Profile</a></li>
				  <li class="menu-item"><a class="menu-link" href="/favs">Favourites</a></li>
				  <li class="menu-item"><a class="menu-link" href="/logout">Logout</a></li>
				</ul>
			  </section>
			`;
		  }
	} else {
		// user not logged in
		header = `
		<section class="top-nav">
			<div id="logo"></div>
			<p id="logotitle"><a href="https://freelance-webpage-1-1.onrender.com/">Freelance Web Projects</a></p>
		  	<input id="menu-toggle" type="checkbox"/>
		  	<label class="menu-button-container" for="menu-toggle">
				<div class="menu-button"></div>
		  	</label>
		  	<ul class="menu">
				<li class="menu-item"><a class="menu-link" href="/">Index</a></li>
				<li class="menu-item"><a class="menu-link" href="/signup">Signup</a></li>
				<li class="menu-item"><a class="menu-link" href="/login">Login</a></li>
		  	</ul>
		</section>
	  `;

	}
  
	// Add the header to the DOM
	let documentHeader = document.querySelector("header");
	documentHeader.innerHTML+= header;
}

setHeader();



// ---------------SEARCH PROJECTS------------------
const searchResultsSection = document.querySelector('.search-results');
const searchProjectsForm = document.querySelector('#search-projects');
const skillList = ['Python', 'Java', 'PHP', 'JavaScript', '.NET', 'CSS', 'HTML5'];
const skillsList2 = ['Linux', 'C++ Programming', 'C# Programming', 'Objective C', 'WordPress'];

// It prints project card
function printProjectCard(projects) {
	projects.forEach((project, i)=>{
		project.description = project.description.substr(0,550);

		const articleProjectCard = document.createElement('article');
		articleProjectCard.classList.add('project-card');
		articleProjectCard.id = `project-card-${i+1}`
		articleProjectCard.innerHTML = `
		<div class="project-title">
			<h2><a href="${project.url}" target="_blank">${project.title}</a></h2>
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
				skillParagraph.classList.add('skill-paragraph');
				skillParagraph.id = `skill-paragraph-${i+1}`;
				projectSkillsDiv.appendChild(skillParagraph);

				skillParagraph.addEventListener('click', ()=> {
					console.log('has pinchado: ' + skill);
					searchResultsSection.innerHTML = '';
					printLinks();
					getProjects(skill);
				})
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
					postData("https://freelance-webpage-1-1.onrender.com/api/users/favs", favouriteInfo).then((data) => {
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
					deleteData("https://freelance-webpage-1-1.onrender.com/api/users/favs", favouriteInfo).then((data) => {
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
			const response = await fetch(`https://freelance-webpage-1-1.onrender.com/api/projects/search?keyword=${keyword}`);
			let projects = await response.json();
			printProjectCard(projects);
			return projects;
		} catch (error) {
			console.error(`ERROR: ${error.stack}`);
		}
	} else {
		try {
			const response = await fetch(`https://freelance-webpage-1-1.onrender.com/api/projects/search`);
			let projects = await response.json();
			printProjectCard(projects);
			return projects;
		} catch (error) {
			console.error(`ERROR: ${error.stack}`);
		}
	}
}

async function printLinks() {
	const skillLinksArticle1 = document.createElement('article');
	skillLinksArticle1.id = 'skill-links-article-1';
	skillList.forEach((skill, i)=>{
		const skillLinkDiv = document.createElement('div');
		skillLinkDiv.classList.add = 'skill-link-div'
		skillLinkDiv.innerHTML = `<div><a class='skill-link-a-1' id='skill-link-a-${i+1}' href="">${skill}</a></div>`;
		skillLinksArticle1.appendChild(skillLinkDiv);
	})

	searchResultsSection.appendChild(skillLinksArticle1);

	const skillLinkAnchors1 = document.querySelectorAll('.skill-link-a-1');
	skillLinkAnchors1.forEach((item, i)=>{
		item.addEventListener('click', (event)=>{
			event.preventDefault();
			searchResultsSection.innerHTML = '';
			printLinks()
			getProjects(skillList[i]);
		})
	})

	const skillLinksArticle2 = document.createElement('article');
	skillLinksArticle2.id = 'skill-links-article-2';
	skillsList2.forEach((skill, i)=>{
		const skillLinkDiv = document.createElement('div');
		skillLinkDiv.classList.add = 'skill-link-div'
		skillLinkDiv.innerHTML = `<div><a class='skill-link-a-2' id='skill-link-a-${i+2}' href="">${skill}</a></div>`;
		skillLinksArticle2.appendChild(skillLinkDiv);
	})
	searchResultsSection.appendChild(skillLinksArticle2);

	const skillLinkAnchors2 = document.querySelectorAll('.skill-link-a-2');
	skillLinkAnchors2.forEach((item, i)=>{
		item.addEventListener('click', (event)=>{
			event.preventDefault();
			searchResultsSection.innerHTML = '';
			printLinks()
			getProjects(skillsList2[i]);
		})
	})
}
// If search-projects-form exists, add submit event listener
if (searchProjectsForm) {
	printLinks();
	getProjects();
	
	
	searchProjectsForm.addEventListener('submit', (event) => {
		event.preventDefault();
		
		searchResultsSection.innerHTML = '';
		const keywordInput = document.querySelector('#keyword');
		printLinks();
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
		fetch(`https://freelance-webpage-1-1.onrender.com/api/projects/project/${projects[i]._id}`, {
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


			fetch(`https://freelance-webpage-1-1.onrender.com/api/projects/project`,
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
	const updateResultsButton = document.createElement('div');
	updateResultsButton.innerHTML = `
		<button id='update-results-button'>Update results</button>`
	// dashboardResultsSection.appendChild(updateResultsButton);
	updateResultsButton.addEventListener('click', ()=>{
		fetch(`http://localhost:3000/api/projects/search/scrap`).catch(error=>console.log(error));
	})


	// To create "create-project" button
	const createButtonArticle = document.createElement('div');
	createButtonArticle.innerHTML = `
		<button id='create-project'>Create project</button>`;
	// dashboardResultsSection.appendChild(createButtonArticle);

	const buttonsAdminArticle = document.createElement('article');
	buttonsAdminArticle.id = 'buttons-admin';
	buttonsAdminArticle.appendChild(updateResultsButton);
	buttonsAdminArticle.appendChild(createButtonArticle);
	dashboardResultsSection.appendChild(buttonsAdminArticle);

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
			fetch(`https://freelance-webpage-1-1.onrender.com/api/projects/project`,
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
