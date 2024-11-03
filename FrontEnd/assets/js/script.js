"use strict";

// ******** CONSTANTS ********
const URL = "http://localhost:5678/api/";

const worksElements = document.querySelector(".gallery");
const filtersElements = document.querySelector(".filters");

const editMode = document.querySelector(".edit-mode");
const editBtn = document.querySelector(".edit-modify");
const addButton = document.querySelector(".add-button");

// ******** VARIABLES ********
let works = [];
let categories = [];

// ******** FUNCTIONS ********

// *** Fonction qui récupè des données de type JSON à partir d'une URL en fonction d'un paramètre type ***//
const getData = async (type) => {
    try {
        const response = await fetch(URL + type);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// ******** DISPLAY WORKS (PROJETS) ********//

// *** Ce code JavaScript est une fonction asynchrone qui permet d'afficher des filtres sous forme de boutons sur une page web. Ces filtres sont basés sur des catégories récupérées depuis une source externe. ***//

/** Afficher les works ou les projets
 * @param {Array} works
*/
const displayWorks = async () => {
    works = await getData("works");

    worksElements.innerHTML = "";
    // console.log(works);

    for (const work of works) {
        const figure = document.createElement("work");
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

    const allListElt = document.createElement("li");
    // console.log(allListElt);

    const allButton = document.createElement("button");

    allButton.innerText = "Tous";
    allButton.className = "filters-btn";

    allButton.addEventListener("click", () => {
        displayWorks(works);
    });
    // console.log(allButton);
    allListElt.appendChild(allButton);
    // console.log(allListElt);
    filtersElements.appendChild(allListElt);
    // console.log(filtersElements);

    for (const category of categories) {
        const btnFiltered = document.createElement("button");

        btnFiltered.textContent = category.name;
        btnFiltered.classList.add("filters-btn"); // Ajout de la classe "filters-btn";

        filtersElements.appendChild(btnFiltered);

        btnFiltered.addEventListener("click", () => {
            displayFilteredWorks(category.id);
        });
        filtersElements.appendChild(btnFiltered);
    }
}
// function displayFilteredWorks(categoryId) {
//     const filteredWorks = works.filter(work => work.categoryId === categoryId);

//     displayWorks(filteredWorks);
// }

// Récupérer l'élément mes projets (#categories) et ajouter le bouton modifier
// TODO : afficher le bouton modifier à coté du titre mes projets

const modifyButton = document.createElement("button");
const modifyIcon = document.createElement("i");

modifyButton.textContent = "Modifier";
modifyButton.className = "modify-btn";
modifyIcon.className = "fa-solid fa-pen-to-square";
// modifyButton.addEventListener("click", openModal);

modifyButton.appendChild(modifyIcon);
document.querySelector("#portfolio h2").insertAdjacentElement("afterend", modifyButton);

// ******** LOGIN & LOGOUT ******** //

// *** Ce code défini une fonction nomée LOGIN, qui permet à un utilisateur de se connecter à une application web en suivant ces étapes ***//



// *** Ce code définit une fonction Javascript nomée LOGOUT, qui permet à un utilisateur de se déconnecter d'une application web en suivant ces étapes ***//

const logoutBtn = document.querySelector("#logout");
// const logout = () => {
//     localStorage.removeItem("token");
//     displayLogAdmin();
//     location.reload();
// }

// logoutBtn.addEventListener("click", logout);

const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}

const createLogoutBtn = () => {
    const logoutButton = document.createElement("button");
    const loginLink = document.querySelector("[href='login.html']");

    if (logoutButton && loginLink) {
        logoutButton.textContent = "Logout";
        logoutButton.className = "filters-btn";
        logoutButton.addEventListener("click", logout);
        loginLink.replaceWith(logoutButton);
    }
}

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

/** Etape1 : Gestion des classes avec une fonction utilitaire : Le code effectue beaucoup de manipulations de classes similaires, ce qui pourrait être simplifié avec une fonction utilitaire pour ajouter ou retirer plusieurs classes en une seule étape. Cela rendrait le code plus lisible ***/
// const toggleElements = (elements, action) => {
//     elements.forEach(el => el.classList[action]("hide"));
// };

/** Etape2 : Ensuite, vous pouvez l'utiliser pour simplifier displayLogAdmin */
// const displayLogAdmin = () => {
//     if (localStorage.getItem("token")) {
//         toggleElements([editMode, editBtn], "remove");
//         toggleElements([filtersElements, loginBtn], "add");
//         toggleElements([logoutBtn], "remove");
//     } else {
//         toggleElements([editMode, editBtn], "add");
//         toggleElements([filtersElements, loginBtn], "remove");
//         toggleElements([logoutBtn], "add");
//     }
// };

/** Etape3 : Centraliser l'état de connexion dans une variable : Au lieu de vérifier deux fois localStorage.getItem("token"), enregistrez cet état dans une variable. Cela rend le code plus lisible et réduit le nombre d’appels au localStorage */
// const displayLogAdmin = () => {
//     const isAdminLoggedIn = Boolean(localStorage.getItem("token"));
//     if (isAdminLoggedIn) {
//         // Rendre visible le mode édition pour l'admin connecté
//         toggleElements([editMode, editBtn], "remove");
//         toggleElements([filtersElements, loginBtn], "add");
//         toggleElements([logoutBtn], "remove");
//     } else {
//         // Masquer le mode édition et afficher les éléments standards
//         toggleElements([editMode, editBtn], "add");
//         toggleElements([filtersElements, loginBtn], "remove");
//         toggleElements([logoutBtn], "add");
//     }
// };


// *** Vérifier si le Token d'authentification est présent dans le localStorage pour déterminer quelle interface doit être affichée ****/
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
    }
}

// checkToken();

// ******** PORTFOLIO ******** //
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

function previewImage(e) {
    const input = e.target;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            reader.src = e.target.result;
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


/**  Met à jour l'état du bouton en fonction des champs d'entrée */

    const updateButtonState = () => {
        const isTitleFilled = TitleInput.value.trim() !== '';

        const isCategorySelected = categoriesSelect.value !== '0';

        if (isTitleFilled && isCategorySelected) {
            validateBtn.classList.add('btnGreen');
        } else {
            validateBtn.classList.remove('btnGreen');
        }
    }


    titleInput.addEventListener('input', updateButtonState);
    categorieSelect.addEventListener('change', updateButtonState);
});

const sendFormData = async () => {
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('category', document.getElementById('categories').value);
    formData.append('image', fileInput.files[0]);

    const token = localStorage.getItem("token");

    console.log(typeof formData.get("category"), formData.get("category"));
    if (formData.get("title") && formData.get("category") !== formData.get("image") && token) {

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
            .then(async (response) => {
                if (response.ok) {
                    const newWork = await response.json();
                    works.push(newWork);
                    console.log(works);
                    // displayWorks(works);
                }
            })

                .catch((error) => {
                    console.error(error);
                });
            }
        };

        /**  Ajoute une nouvelle image à la galerie avec le titre fourni */
         imageUrl ==? fileInput

        function addImageToGallery(fileInput, title) {  
            const newFigure = document.createElement("figure");

            const newImg = document.createElement("img");
            newImg.src = URL.createObjectURL(fileInput.files[0]);
            newImg.alt = title;

            const newfigcaption = document.createElement("figcaption");
            newfigcaption.textContent = title;

            newFigure.appendChild(newImg);
            newFigure.appendChild(newfigcaption);
            modalGallery.appendChild(newFigure);
        }

        /**  Initialise l'application en récupérant les données de l'API , en générant et affichant les travaux et les galeries, et en activant la modale */

        const init = async () => {
            await getData("works");
            await getData("categories");

            displayWorks(works);
            displayCategories();
            displayLogAdmin();
            toggleModal();
        };

        // ******** MAIN ************ //

        init();

        //----------------------------------------------------------------------------------------------------------------------------------//

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

        checkToken();
        displayWorks();
