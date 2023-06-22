
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
	projects.forEach((project, i)=>{
		project.description = project.description.substr(0,550);

		const articleProjectCard = document.createElement('article');
		articleProjectCard.classList.add('.project-card');
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
// http://localhost:3000/dashboard
const dashboardResultsSection = document.querySelector('.dashboard');

function printDetail(projects, i) {
	dashboardResultsSection.innerHTML = `
				<article>
					<h1>Project edition</h1>
				</article>
				<article>
					<div class="project-title">
						<h2>${projects[i].title}</h2>
					</div>
					<div class="project-description">
						<p>${projects[i].description}</p>
					</div>
					<div class="project-budget">
						<p>${projects[i].budget}</p>
					</div>
				</article>
				<article>
					<button>Edit</button>
					<button>Delete</button>
				</article>`;
}

if (dashboardResultsSection) {
	// getAndAwaitProjects();
	getProjects().then(projects=>{
		const projectCardArticle =  document.querySelectorAll('.dashboard article');
		projectCardArticle.forEach((article, i)=>{
			article.addEventListener('click', () => {
				printDetail(projects, i)
			})
		})
	})
}