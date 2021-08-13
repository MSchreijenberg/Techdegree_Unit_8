// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalForward = document.querySelector(".modal-forward");
const modalBack = document.querySelector(".modal-back");

let index;
let input;

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err));

function displayEmployees(empolyeeData){
    employees = empolyeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
        </div>
    </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
};

function displayModal(index){
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
    let date= new Date (dob.date);
    const modalHTML = `
    <img class="avatar" src = "${picture.large}"/>
    <div class="modal-text">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr/>
        <p>${phone}</p>
        <p class="address">${street.name} ${street.number}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e=>{
    if(e.target !== gridContainer){
        const card = e.target.closest(".card");
        index = card.getAttribute("data-index");
        displayModal(index);
    }

});

modalClose.addEventListener('click', () =>{
    overlay.classList.add("hidden");
});

modalForward.addEventListener('click', () =>{
    if(index < employees.length-1){
        index++;
        displayModal(index);
        
    }
    else{
        index = 0;
        displayModal(index);
    }
 
});

modalBack.addEventListener('click', () =>{
    if(index !== 0){
        index--;
        displayModal(index);
        
    }
    else{
        index = employees.length-1;
        displayModal(index);
    }
});

function searchFunction(){
    input = document.getElementById("searchbar").value.toLowerCase();
    let cardNames = document.querySelectorAll(".name");
    
    cardNames.forEach(name=> {
        let card = name.parentNode.parentNode;
        if(name.textContent.toLocaleLowerCase().includes(input)){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }
    });
     
}


    
