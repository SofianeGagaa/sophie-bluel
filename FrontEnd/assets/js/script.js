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


// *** La fonction displayWorks est conçue pour récupérer une liste d'œuvres (via getData("works")), puis pour chaque œuvre, créer dynamiquement des éléments HTML (<figure>, <img>, <figcaption>), les configurer avec les données de l'œuvre (image et titre), et enfin les ajouter dans un élément de la page appelé gallery. Cela permet d'afficher une galerie d'images avec des titres associés sur une page web. ***//
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

// *** Ce code JavaScript est une fonction asynchrone qui permet d'afficher des filtres sous forme de boutons sur une page web. Ces filtres sont basés sur des catégories récupérées depuis une source externe. ***//
const displayFilters = async () => {
    categories = await getData("categories");
    // console.log(categories);

    for (const category of categories) {
        const categoryElements = document.createElement("button");

        categoryElements.setAttribute("value", category.id);
        categoryElements.className = "category_btn";
        categoryElements.addEventListener("click", () =>
            filterWorks(category.id, categoryElements)
        );

        categoryElements.textContent = category.name;
        categoriesElements.appendChild(categoryElements);
    }
}

// *** Ce code définit une fonction Javascript nomée LOGOUT, qui permet à un utilisateur de se déconnecter d'une application web en suivant ces étapes ***//
const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}

const checkToken =  () => {
    const token = localStorage.getItem("token");
    if (!token) {
        displayFilters();
        
    } else {
        // TODO : afficher la barre noire mode édition
        // TODO : afficher le bouton modifier à coté du titre mes projets
        // TODO : remplacer le lien login par le boutton Logout dans la barre de navigation

    }

}


// ******** PRIMARY MODAL ********

/*** ouverture d'une fenetre de dialogue et preparation de son contenu  */

    // works.forEach((work) => {
    //     const li = document.createElement("li");
    //     li.innerHTML = `
    //         <img src="${work.imageUrl}">
    //         <span class = "delete><i class="fa-solid fa-trash-can"></i></span>
    //     `;
    //     ModalImages.appendChild(li);
    // });
    // const deleteWorks = document.getElementsByClassName("delete");
    // const deleteBtn = [...deleteWorks];

    // for (let i = 0; i < deleteBtn.length; i++) {
    //     deleteBtn[i].addEventListener("click", async function () {
    //         if (confirm("Voulez-vous supprimer cette image ?")) {

    //             try {
    //                 const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
    //                     method: "DELETE",
    //                     headers: {
    //                         'Authorization': `Bearer ${localStorage.getItem("token")}`
    //                     }
    //                 })
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //     })
    // }

// const openModal = () => {
//     document.getElementById("modal").style.display = "block";
//     document.getElementById("modal").style.opacity = "1";    
// }

// const closeModal = () => {
//     document.getElementById("modal").style.display = "none";
//     document.getElementById("modal").style.opacity = "0";
//     document.getElementById("modal").style.transform = "translateY(-100%)";
// }

// const returnModal = () => {
//     document.getElementById("overflow-modal").style.display = "none";
//     document.getElementById("overflow-modal").style.opacity = "0";
//     document.getElementById(modal).style.display = "block";
//     document.getElementById(modal).style.opacity = "1";
// }

// ******** SECONDARY MODAL ********




// ******** MAIN CODE ********

checkToken();
displayWorks();
