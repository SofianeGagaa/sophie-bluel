"use strict";

// ******** CONSTANTS ********
const URL = "http://localhost:5678/api/";

const gallery = document.querySelector(".gallery");

const worksElements = document.getElementById("works");
const categoriesElements = document.getElementById("categories");
const filterElements = document.getElementById("filter");

// ******** VARIABLES ********
let works = [];
let categories = [];


// ******** FUNCTIONS ********

// *** cette fonction permet de récupérer des données de type JSON à partir d'une URL en fonction d'un paramètre type. Elle peut être utilisée pour récupérer des données spécifiques en fonction de la valeur de type. ***//
const getData = async (type) => {
    try {
        const response = await fetch(URL + type);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

// *** La fonction displayWorks est conçue pour récupérer une liste de works (via getData("works")), puis pour chaque work, créer dynamiquement des éléments HTML (<figure>, <img>, <figcaption>), les configurer avec les données du work (image et titre), et enfin les ajouter dans un élément de la page appelé gallery. Cela permet d'afficher une galerie d'images avec des titres associés sur une page web. ***//

// *** Ce code JavaScript est une fonction asynchrone qui permet d'afficher des filtres sous forme de boutons sur une page web. Ces filtres sont basés sur des catégories récupérées depuis une source externe. ***//
const displayWorks = async () => {
    works = await getData("works");

    for (const work of works) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

// *** Ce code définit une fonction Javascript nomée LOGOUT, qui permet à un utilisateur de se déconnecter d'une application web en suivant ces étapes ***//
const logout = () => {
    console.log("logout()");
    localStorage.removeItem("token");
    window.location.reload();
}

const createLogoutBtn = () => {
    console.log("createLogoutBtn()");
    const logoutButton = document.createElement("button");
    const loginLink = document.querySelector("[href='login.html']");

    if (logoutButton && loginLink) {
        logoutButton.textContent = "Logout";
        logoutButton.className = "category_btn";
        logoutButton.addEventListener("click", logout);
        loginLink.replaceWith(logoutButton);
    }
}

// *** Vérifier si le Token d'authentification est présent dans le localStorage pour déterminer quelle interface doit être affichée ***//
const checkToken = () => {
    console.log("checkToken()");
    const token = localStorage.getItem("token");
    // Si le jeton n'est pas dans le localStorage, on affiche les filtres
    if (!token) {
        displayFilters();

    } else {
        // Si le jeton est dans le localStorage, on affiche le mode d'édition ou les projets

        // Création du bouton de mode d'Édition
        // TODO : Ajouter l'icone fa fa-pen-to-square dans le if
        const editButton = document.createElement("aside");

        if (editButton) {
            // Ajout de l'icône fa fa-pen-to-square
            const editIcon = document.createElement("i");
            editIcon.className = "fa-solid fa-pen-to-square";

            // Ajout de l'icône et du texte dans le bouton de mode édition
            editButton.textContent = "Mode edition";
            editButton.className = "edit-mode";
            editButton.insertBefore(editIcon, editButton.firstChild); // Ajout de l'icône avant le texte
            document.body.insertAdjacentElement("afterbegin", editButton); // Ajout du bouton de mode d'édition en haut de la page
        }

        // Récupérer lélément mes projets (#categories) et ajouter le bouton modifier
        // TODO : afficher le bouton modifier à coté du titre mes projets
        const myWorks = document.getElementById
        ("categories");
        myWorks.appendChild(myWorksButton);
        if (myWorks) {
            const myWorksButton = document.createElement("button");
            myWorksButton.textContent = "Modifier";
            myWorksButton.className = "category_btn";

            // Ajout d'une icône fa fa-pen-to-square dans le bouton modifier
            const modifyIcon = document.createElement("i");
            modifyIcon.className = "fa-solid fa-pen";
            myWorksButton.insertBefore(modifyIcon, myWorksButton.firstChild);

            // Ajouter un événement clic pour rediriger ou activer l'édition des projets
            myWorksButton.addEventListener("click", () => {
                console.log("Modifier clicked!");
                editMode = true;
                window.location.href = "myWorks.html";
            });

        }
        // TODO : OK
        createLogoutBtn();
    }

}

// ******** PRIMARY MODAL ********

/*** ouverture d'une fenetre de dialogue et preparation de son contenu  */

works.forEach((work) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <img src="${work.imageUrl}">
        <span class = "delete><i class="fa-solid fa-trash-can"></i></span>
    `;
    ModalImages.appendChild(li);
});
const deleteWorks = document.getElementsByClassName("delete");
const deleteBtn = [...deleteWorks];

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", async function () {
        if (confirm("Voulez-vous supprimer cette image ?")) {

            try {
                const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
}

const openModal = () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").style.opacity = "1";    
}

const closeModal = () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal").style.opacity = "0";
    document.getElementById("modal").style.transform = "translateY(-100%)";
}

const returnModal = () => {
    document.getElementById("overflow-modal").style.display = "none";
    document.getElementById("overflow-modal").style.opacity = "0";
    document.getElementById(modal).style.display = "block";
    document.getElementById(modal).style.opacity = "1";
}

// ******** SECONDARY MODAL ********




// ******** MAIN CODE ********

checkToken();
displayWorks();
