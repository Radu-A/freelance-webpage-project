console.log("hola")

// Example POST method implementation:
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


//USER - Siendo usuario, editar mis propios datos mostrados en profile:
const formUserData = document.getElementById("formUserData");
const editUserData = document.getElementById("editUserData");

if (formUserData) {
	const form = document.createElement("form");
  	const emailInput = document.createElement("input");
	const userNameInput = document.createElement("input");
	const firstNameInput = document.createElement("input");
	const surnameInput = document.createElement("input");
	const submitButton = document.createElement("button");

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

	form.appendChild(emailInput);
	form.appendChild(userNameInput);
	form.appendChild(firstNameInput);
	form.appendChild(surnameInput);
	form.appendChild(submitButton);

	formUserData.appendChild(form);

	// Send user info event
	submitButton.addEventListener("submit", function(e) {
		e.preventDefault();
		
		let newInfo = {
			email: e.target.email.value,
			userName: e.target.userName.value,
			firstName: e.target.firstName.value,
			surename: e.target.surname.value
		}
		console.log("+++++++",newInfo)

		try {
			putData("http://localhost:3000/api/users/user", newInfo).then((data) => {
			console.log(data); // JSON data parsed by `data.json()` call
			}); 
		} catch (error) {
			console.error(error);
		}
	});
	/*   
	editUserData.addEventListener("click", function(event) {
		event.preventDefault();

	

	});
	*/
}





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
		articleProjectCard.classList.add('project-card');
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
if (searchProjectsForm) {
	searchProjectsForm.addEventListener('submit', (event) => {
		event.preventDefault();
	
		searchResultsSection.innerHTML = '';
		const keywordInput = document.querySelector('#keyword');
		getProjects(keywordInput.value);
	})
}



// -------------------DASHBOARD-------------------------------
const dashboardResultsSection = document.querySelector('.dashboard');
if (dashboardResultsSection) {
	getProjects();
}