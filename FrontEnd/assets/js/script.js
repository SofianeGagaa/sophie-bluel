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

// ******** DISPLAY WORKS (PROJETS) ********//

// *** Ce code JavaScript est une fonction asynchrone qui permet d'afficher des filtres sous forme de boutons sur une page web. Ces filtres sont basés sur des catégories récupérées depuis une source externe. ***//

/** Afficher les works ou les projets
 * @param {Array} works
*/
const displayWorks = async () => {
    works = await getData("works");

    worksElements.innerHTML = " ";
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

// *** DISPLAY CATEGORIES (FILTRES) ***//

const displayCategories = async () => {
    categories = await getData("categories");
    // console.log(categories);

    const allButton = document.createElement("button");

    allButton.innerText = "Tous";
    allButton.classList.add("filters-btn"); // Ajout de la classe "filter-btn";

    allButton.addEventListener("click", () => {
        displayWorks(works);
    })
    filtersElements.appendChild(allButton);

    for (const category of categories) {
        const btnFiltered = document.createElement("button");

        btnFiltered.innerText = category.name;
        btnFiltered.classList.add("filters-btn"); // Ajout de la classe "filters-btn";

        btnFiltered.addEventListener("click", () => {
            displayFilderedWorks(category.id);
        });
        filtersElements.appendChild(btnFiltered);
    }
}

function displayFilderedWorks(categoryId) {
    const filteredWorks = works.filter(work => work.categoryId === categoryId);

    displayWorks(filteredWorks);
}



/**
 * Afficher la cartégorie des filtres sous forme de boutons
 * @param {Array} categories    
 */
// const displayCategories = async () => {
//     categories = await getData("categories");
//     console.log(categories);

//     const allListElt = document.createElement("li");
//     // console.log(allListElt);
//     const allButton = document.createElement("button");

//     allButton.textContent = "Tous";
//     allButton.className = "category-btn";

//     allButton.addEventListener("click", () => {
//         displayWorks(works);
//     });
//     // console.log(allButton);

//     allListElt.appendChild(allButton);
//     // console.log(allListElt);
//     filtersElements.appendChild(allListElt);
//     // console.log(filtersElements);

//     for (const category of categories) {
//         const btnFiltered = document.createElement("button");

//         btnFiltered.textContent = category.name;
//         btnFiltered.classList.add("category-btn"); // Ajout de la classe "category-btn";
//         filtersElements.appendChild(btnFiltered) ;

//         btnFiltered.addEventListener("click", () => {
//             displayWorksByCategory(category.id);
//         });
//         filtersElements.appendChild(btnFiltered);
//     }
// }

// function displayWorksByCategory(categoryId) {
//     const filteredWorks = works.filter((work) => work.categoryId === categoryId);
//     displayWorks(filteredWorks);
// } 

// ******** LOGIN & LOGOUT ******** //

// *** Ce code défini une fonction nomée LOGIN, qui permet à un utilisateur de se connecter à une application web en suivant ces étapes ***//
// *** Ce code définit une fonction Javascript nomée LOGOUT, qui permet à un utilisateur de se déconnecter d'une application web en suivant ces étapes ***//

const displayLogAdmin = () => {
    if (localStorage.getItem("token")) {
        editMode.classList.remove("hide");
        editBtn.classList.remove("hide");
        filtersElements.classList.add("hide");

        loginBtn.classList.add("hide");
        logoutBtn.classList.remove("hide");
    } else {
        editMode.classList.add("hide");
        editBtn.classList.add("hide");
        filtersElements.classList.remove("hide");

        loginBtn.classList.remove("hide");
        logoutBtn.classList.add("hide");
    }
}

const logoutBtn = document.querySelector("#logout");
const logout = () => {
    localStorage.removeItem("token");
    displayLogAdmin();
    location.reload();
}

// logoutBtn.addEventListener("click", logout);

// const logout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
// }

// const createLogoutBtn = () => {
//     const logoutButton = document.createElement("button");
//     const loginLink = document.querySelector("[href='login.html']");

//     if (logoutButton && loginLink) {
//         logoutButton.textContent = "Logout";
//         logoutButton.className = "category-btn";
//         logoutButton.addEventListener("click", logout);
//         loginLink.replaceWith(logoutButton);
//     }
// }

// *** Vérifier si le Token d'authentification est présent dans le localStorage pour déterminer quelle interface doit être affichée ***//
// const checkToken = () => {
//     const token = localStorage.getItem("token");
//     // Si le jeton n'est pas dans le localStorage, on affiche les filtres
//     if (!token) {
//         displayCategories();

//     } else {
//         // Si le jeton est dans le localStorage, on affiche le mode d'édition ou les projets

//         // Création du bouton de mode d'Édition
//         // TODO : Ajouter l'icone fa-regular fa-pen-to-square dans le if
//         const editButton = document.createElement("aside");

//         if (editButton) {
//             // Ajout de l'icône fa fa-pen-to-square
//             const editIcon = document.createElement("i");
//             editIcon.className = "fa-solid fa-pen-to-square";

//             // Ajout de l'icône et du texte dans le bouton de mode édition
//             editButton.textContent = "Mode edition";
//             editButton.className = "edit-mode";
//             editButton.insertBefore(editIcon, editButton.firstChild); // Ajout de l'icône avant le texte
//             document.body.insertAdjacentElement("afterbegin", editButton); // Ajout du bouton de mode d'édition en haut de la page
//         }
//     }
// }

// checkToken();

// ******** PORTFOLIO ******** //

        // Récupérer lélément mes projets (#categories) et ajouter le bouton modifier
        // TODO : afficher le bouton modifier à coté du titre mes projets



        // const modifyButton = document.createElement("button");
        // const modifyIcon = document.createElement("i");

        // modifyButton.textContent = "Modifier";
        // modifyButton.className = "modify-btn";
        // modifyIcon.className = "fa-solid fa-pen-to-square";
        // modifyButton.addEventListener("click", openModal);

        // modifyButton.appendChild(modifyIcon);
        // document.querySelector("#portfolio h2").insertAdjacentElement("afterend", modifyButton);




        // TODO : OK
        // createLogoutBtn();

// ******** MODALS (fenètre de dialogue) ********

const dialog = document.querySelector("dialog");
const openButton = document.querySelector("dialog + .my-projects  button");
const closeButton = document.querySelector("dialog button");

/** Bascule la fenêtre de dialogue */

const toggleModal = () => {
    openButton.addEventListener("click", () => {
        dialog.showModal();
        dialog.classList.toggle("active");
        displayModalGallery();
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.classList.toggle("active");
    });
}

/** Création de la galerie */

const displayModalGallery = () => {
    modalGallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const figure = works[i];

        const galleryElement = document.createElement("figure");
        galleryElement.classList.add("gallery-element");
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

/**  DELETE WORKS (PROJETS)  */

const deleteWork = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Vous devez être connecté pour supprimer une image.");
        return;
    }

    const responseDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (responseDelete.ok) {
        works = works.filter(work => work.id !== id);

        displayWorks(works);
        displayModalGallery();
    } else {
        alert("Une erreur est survenue. Veuillez recharger la page.");
    }
}

/**  Formulaire modale pour ajouter une image */

const displayModalForm = () => {
    modalGallery.innerHTML = "";

    const submitButton = addButton;

    document.querySelector(".modal-gallery h2").innerText = "Ajouter une image";
    BackButton.classList.remove("hide");
    formButton.classList.remove("hide");
    submitButton.classList.add("active");
    divBar.classList.add("active");
    pPhoto.classList.remove("hide");

    submitButton.innerText = "Valider";

    const titlePhoto = document.createElement("h2");
    modalGallery.appendChild(titlePhoto);

    BackButton.addEventListener("click", () => {
        displayModalGallery();

        formButton.classList.add("hide");
        submitButton.innerText = "Ajouter une image";
        submitButton.classList.remove("active");
        divBar.classList.remove("active");

        document.querySelector(".modal-gallery h2").innerText = "Galerie photo";
        BackButton.classList.add("hide");
    })

    document.getElementById("imageInput").addEventListener("change", previewImage);

    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        sendFormData();  
    });
}

/**  Affiche Image sélectionée par l'utilisateur */

function previewImage() {
    const submitButton = addButton;
    const input = e.target;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            reader.src= e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
    divForm.classList.remove("hide");
    btnImage.classList.add("hideTwo");
}

const fileInput = document.getElementById('image');
const previewContainer = document.getElementById('image-preview-container');
const uploadForm = document.getElementById('ImageInput');

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title');
    const categorieSelect = document.getElementById('categories');
    const validateBtn = addButton;
});

/**  Met à jour l'état du bouton en fonction des champs d'entrée */
    


    

    // const deleteBtn = [...deleteWorks];

//     for (let i = 0; i < deleteBtn.length; i++) {
//         deleteBtn[i].addEventListener("click", async function () {
//             if (confirm("Voulez-vous supprimer cette image ?")) {

//                 try {
//                     const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
//                         method: "DELETE",
//                         headers: {
//                             'Authorization': `Bearer ${localStorage.getItem("token")}`
//                         }
//                     })
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         })
//     }
// }

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







// ******** MAIN CODE ********

// checkToken();
displayWorks();
