"use strict";

// ******** CONSTANTS ********
const URL = "http://localhost:5678/api/";

const worksElements = document.getElementById("works");
const filtersElements = document.getElementById("filters");

const editMode = document.querySelector(".edit-mode");
const editBtn = document.querySelector(".btn-modify");
const loginBtn = document.querySelector("#login");


// ******** VARIABLES ********
let works = [];
let categories = [];

// ******** FUNCTIONS ********

/*** Stape1: Home page 
 **  Stape1.1: FONCTION générale utilisant fetch qui récupère les données de type JSON à partir d'une URL en fonction d'un paramètre type (works ou categories)  */

const getData = async (type) => {
    try {
        const response = await fetch(URL + type);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// *** DISPLAY WORKS (Affichage des projets de la gallerie***//
const displayWorks = async () => {
    works = await getData("works");

    // worksElements.innerHTML = "";
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
displayWorks();

/*** Stape1.2: Display filtered works 
 ** Ajout des filtres sous forme de boutons pour afficher les travaux par categorie
*/
// *** DISPLAY CATEGORIES (FILTRES) ***//
const displayCategories = async () => {
    categories = await getData("categories");
    // console.log(categories);

    const allListElt = document.createElement("li");
    // console.log(allListElt);
    const allButton = document.createElement("button");

    allButton.textContent = "Tous";
    allButton.className = "btn-filters";

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
        btnFiltered.classList.add("btn-filters"); // Ajout de la classe "btn-filters";
        filtersElements.appendChild(btnFiltered);

        btnFiltered.addEventListener("click", () => {
            filterWorks(category.id);
        });
        filtersElements.appendChild(btnFiltered);
    }
}

function filterWorks(categoryId) {
    const filteredWorks = works.filter(work => work.categoryId === categoryId);
    console.log(filteredWorks);
    displayWorks(filteredWorks);
}
displayCategories();


/*** Stape2: ADIM logPage. Codez la page de connexion
 ** Stape2.1: Intégration de la page de formulaire
 */

//  Voir le fichier login.html

/*** Stape2.1: ADIM. Authentification de l'utilisateur
 * TOKEN d'authentification
 */

const displayLogAdmin = () => {
    // Rendre visible le mode édition pour l'admin connecté; le else est le contraire du if pour add/remove
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
        const logoutBtn = document.createElement("button");
        const modifyBtn = document.createElement("button");

        modifyBtn.id = "modify";
        logoutBtn.id = "logout";

        logoutBtn.innerText = "logout";
        modifyBtn.innerText = "modify";
      
modifyBtn.addEventListener("click , displayModalGallery");
logoutBtn.addEventListener("click", logout);

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

    }
}
// displayLogAdmin();

const logout = () => {
    localStorage.removeItem("token");
    displayLogAdmin();
    location.reload();
}


/*** Stape3: AJOUTER LA MODALE permettant à l'utilisateur de modifier ses projets 
 * Stape3.1: Ajout de la fenêtre modale- apparition et disparition (toggleModal)
*/

//  MODALS  

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
    modifyBtn.addEventListener("click", generateModalForm);
}

/*** 
 * Stape3.2: Suppression de travaux existant */

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

/*** Stape3.3: Envoi d'un nouveau projet au backend via le formulaire de la modale 
 * Générer un formulaire por l'ajout d'une image
*/
const displayModalForm = () => {
    modalGallery.innerHTML = "";

    const submitButton = modifyBtn;

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

/*** Stape3.4: Traitement de la réponse de l'API pour afficher dynamiquement la nouvelle image de la modale */

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
    btnImage.classList.add("hide Prime");
}

const fileInput = document.getElementById('image');
const previewContainer = document.getElementById('image-preview-container');
const uploadForm = document.getElementById('ImageInput');

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title');
    const categoriesSelect = document.getElementById('categories');


    // Mettre à jour le bouton en fonction des champs d'entrée

        const updateButtonState = () => {
        const isTitleFilled = titleInput.value.trim() !== '';

        const isCategorySelected = categoriesSelect.value !== '0';

  
    }

    updateButtonState();

    titleInput.addEventListener('input', updateButtonState);
    categoriesSelect.addEventListener('change', updateButtonState);
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

 const init = async () => {
            await getData("works");
            await getData("categories");

            displayWorks(works);
            displayCategories();
            displayLogAdmin();
            toggleModal();
        };



















// checkToken();

// ******** PORTFOLIO ******** //
// TODO : OK
// createLogoutBtn();

// ******** MODALS (fenètre de dialogue) ********

// const dialog = document.querySelector("dialog");
// const openButton = document.querySelector("dialog + .my-projects  button");
// const closeButton = document.querySelector("dialog button");



/** Création de la galerie */



/**  DELETE WORKS (PROJETS)  */



/**  Formulaire modale pour ajouter une image */


/**  Affiche Image sélectionée par l'utilisateur */



/**  Met à jour l'état du bouton en fonction des champs d'entrée */







        /**  Ajoute une nouvelle image à la galerie avec le titre fourni */
        //  imageUrl ==? fileInput

        
        /**  Initialise l'application en récupérant les données de l'API , en générant et affichant les travaux et les galeries, et en activant la modale */

       

        // ******** MAIN ************ //

        // init();

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

        // checkToken();
        // displayWorks();



// ******** Fonction alternative GETDATA qui récupère les données  works et categories de l'API ******** //
// const getData = async (type) => {
//     const response = await fetch(URL + type);

//     if (type === "works") {
//         works = await response.json();
//     } else  {
//         categories = await response.json();
//     }
// }


// const logout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
// }

// const createLogoutBtn = () => {
//     const logoutButton = document.createElement("button");
//     const loginLink = document.querySelector("[href='login.html']");

//     if (logoutButton && loginLink) {
//         logoutButton.textContent = "Logout";
//         logoutButton.className = "filters-btn";
//         logoutButton.addEventListener("click", logout);
//         loginLink.replaceWith(logoutButton);
//     }
// }

// const checkToken = () => {
//     const token = localStorage.getItem("token");
//     // Si le jeton n'est pas dans le localStorage, on affiche les filtres
//     if (!token) {
//         displayCategories();

//     } else {
        // Si le jeton est dans le localStorage, on affiche le mode d'édition ou les projets

        // Création du bouton de mode d'Édition
        // TODO : Ajouter l'icone fa-regular fa-pen-to-square dans le if
        // const editButton = document.createElement("aside");

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
// TODO : afficher le bouton modifier à coté du titre mes projets

// const modifyButton = document.createElement("button");
// const modifyIcon = document.createElement("i");

// modifyButton.textContent = "Modifier";
// modifyButton.className = "modify-btn";
// modifyIcon.className = "fa-solid fa-pen-to-square";
// modifyButton.addEventListener("click", openModal);

// modifyButton.appendChild(modifyIcon);
// document.querySelector("#portfolio h2").insertAdjacentElement("afterend", modifyButton);

// const logout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
// }

// const createLogoutBtn = () => {
//     const logoutButton = document.createElement("button");
//     const loginLink = document.querySelector("[href='login.html']");

//     if (logoutButton && loginLink) {
//         logoutButton.textContent = "Logout";
//         logoutButton.className = "filters-btn";
//         logoutButton.addEventListener("click", logout);
//         loginLink.replaceWith(logoutButton);
//     }
// }
