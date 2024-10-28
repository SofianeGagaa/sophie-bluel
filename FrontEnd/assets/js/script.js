"use strict";

// ******** CONSTANTS ********
const URL = "http://localhost:5678/api/";

const worksElements = document.getElementById("works");
const filtersElements = document.getElementById("filters");
// const filterElements = document.getElementById("filter");

// const editMode = document.querySelector(".edit-mode");

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
        console.error(error);
    }
}

// *** La fonction displayWorks est conçue pour récupérer une liste de works (via getData("works")), puis pour chaque work, créer dynamiquement des éléments HTML (<figure>, <img>, <figcaption>), les configurer avec les données du work (image et titre), et enfin les ajouter dans un élément de la page appelé gallery. Cela permet d'afficher une galerie d'images avec des titres associés sur une page web. ***//

// *** Ce code JavaScript est une fonction asynchrone qui permet d'afficher des filtres sous forme de boutons sur une page web. Ces filtres sont basés sur des catégories récupérées depuis une source externe. ***//

/** Afficher les works ou les projets
 * @param {Array} works
*/
const displayWorks = async () => {
    works = await getData("works");
    // console.log(works);

    for (const work of works) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        worksElements.appendChild(figure);
    }
}

/**
 * Afficher la cartégorie des filtres sous forme de boutons
 * @param {Array} categories    
 */
const displayCategories = async () => {
    categories = await getData("categories");
    console.log(categories);
    console.log(filtersElements);
    const allListElt = document.createElement("li");
    const allButton = document.createElement("button");

    allButton.textContent = "Tous";
    allButton.className = "category-btn";

    allButton.addEventListener("click", () => {
        displayWorks(works);
    });
    console.log(allButton);

    

    allListElt.appendChild(allButton);
    console.log(allListElt);
    filtersElements.appendChild(allListElt);


console.log(categories);
    for (const category of categories) {
        const btnFilter = document.createElement("button");

        btnFilter.textContent = category.name;
        btnFilter.className = "category-btn";
        filtersElements.appendChild(btnFilter);

        btnFilter.addEventListener("click", () => {
            displayWorksByCategory(category.name);
        });
    }
}

// *** Ce code définit une fonction Javascript nomée LOGOUT, qui permet à un utilisateur de se déconnecter d'une application web en suivant ces étapes ***//
const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}

const createLogoutBtn = () => {
    const logoutButton = document.createElement("button");
    const loginLink = document.querySelector("[href='login.html']");

    if (logoutButton && loginLink) {
        logoutButton.textContent = "Logout";
        logoutButton.className = "category-btn";
        logoutButton.addEventListener("click", logout);
        loginLink.replaceWith(logoutButton);
    }
}

// *** Vérifier si le Token d'authentification est présent dans le localStorage pour déterminer quelle interface doit être affichée ***//
const checkToken = () => {
    const token = localStorage.getItem("token");
    // Si le jeton n'est pas dans le localStorage, on affiche les filtres
    if (!token) {
        displayCategories();

    } else {
        // Si le jeton est dans le localStorage, on affiche le mode d'édition ou les projets

        // Création du bouton de mode d'Édition
        // TODO : Ajouter l'icone fa-regular fa-pen-to-square dans le if
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



        const modifyButton = document.createElement("button");
        const modifyIcon = document.createElement("i");

        modifyButton.textContent = "Modifier";
        modifyButton.className = "modify-btn";
        modifyIcon.className = "fa-solid fa-pen-to-square";
        // modifyButton.addEventListener("click", openModal);

        modifyButton.appendChild(modifyIcon);
        document.querySelector("#portfolio h2").insertAdjacentElement("afterend", modifyButton);




        // TODO : OK
        createLogoutBtn();
    }

}

// ******** MODALS ********

const dialog = document.querySelector("#modal");
const openButton = document.querySelector("dialog + .mes-projets > button");
const closeButton = document.querySelector("#close-modal");

const toggleModal = () => {
    openButton.addEventListener("click", () => {
        dialog.displayModal();
        dialog.className.toggle("active");
        generateModalGallery();
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.className.toggle("active");
    });
}

const generateModalGallery = () => {
    modalGallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const figure = works[i];

        const galleryElement = document.createElement("figure");
        galleryElement.className.add("gallery-element");
        galleryElement.innerHTML = `
        <img src="${figure.imageUrl}" alt="${figure.title}">
        <button class="btn-delete" data-id="${figure.id}"><i class="fa-solid fa-trash-can"></i></button>`;

        modalGallery.appendChild(galleryElement);

        galleryElement.querySelector(".btn-delete").addEventListener("click", () => {
            deleteWork(figure.id);

        });
    }
    addButton.addEventListener("click", generateModalForm);
}

const deleteWork = async (id) => {
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
}

// const displayModal = () => {
//         document.getElementById("modal").style.display = "block";
//         document.getElementById("modal").style.opacity = "1";
//         document.getElementById("overlay-modal").style.display = "block";
//         document.getElementById("overlay-modal").style.opacity = "1";

//         const modalGallery = document.querySelector("#modal-gallery");
//         modalGallery.innerHTML = "";
//         works.forEach((work) => {
//             const li = document.createElement("li");
//             li.innerHTML = `
//             <img src="${work.imageUrl}" alt="${work.title}">
//             <span class = "delete"><i class="fa-solid fa-trash-can"></i></span>
//         `;
//             modalGallery.appendChild(li);
//         }); }
//     }

// const deleteWorks = document.getElementsByClassName("delete");
// const deleteBtn = [...deleteWorks];

//         for (let i = 0; i < deleteBtn.length; i++) {
//             deleteBtn[i].addEventListener("click", async function () {
//                 if (confirm("Voulez-vous supprimer cette image ?")) {

//                     try {
//                         const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
//                             method: "DELETE",
//                             headers: {
//                                 'Authorization': `Bearer ${localStorage.getItem("token")}`
//                             })
//                     } catch (error) {
//                         console.log(error);
//                     }
//                 }
//             }
// }

// const closeModal = () => {
//         document.getElementById("modal").style.display = "none";


//         const deleteWorks = document.getElementsByClassName("delete");
//         const deleteBtn = [...deleteWorks];

//         for (let i = 0; i < deleteBtn.length; i++) {
//             deleteBtn[i].addEventListener("click", async function () {
//                 if (confirm("Voulez-vous supprimer cette image ?")) {

//                     try {
//                         const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
//                             method: "DELETE",
//                             headers: {
//                                 'Authorization': `Bearer ${localStorage.getItem("token")}`
//                             })
//                     }
//                     catch (error) {
//                         console.log(error);
//                     }
//                 }
//             }
// }

// const closeModal = () => {
//             document.getElementById("modal").style.display = "none";

//             const deleteWorks = document.getElementsByClassName("delete");
//             const deleteBtn = [...deleteWorks];

//             for (let i = 0; i < deleteBtn.length; i++) {
//                 deleteBtn[i].addEventListener("click", async function () {
//                     if (confirm("Voulez-vous supprimer cette image ?")) {

//                         try {
//                             const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
//                             }
//                         }

//                         catch (error) {
//                             console.log(error);
//                         }
//                     }
//                 }
//             } 
// }


// ******** MAIN CODE ********

checkToken();
displayWorks();
