"use strict";

// ******** CONSTANTS ********


// ******** VARIABLES ********


// ******** FUNCTIONS ********

const URL = "http://localhost:5678/api/";

// const getData = async (type) => {
//     try {
//         const response = await fetch(URL + type);
//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.log(error);
//     }

// }

// const worksElt = document.getElementById("work");

// let works = [];

// const displayWorks = async () => {
//     works = await getData(works);

//     for (const work of works) {
//         const figure = document.createElement("figure");

//         figure.innerHTML = `
//             <img src="${work.imageUrl}">
//             <figcaption>${work.title}</figcaption>
//         `;

//         worksElt.appendCild(figure);
//     }
// }

// const categoriesElt = document.getElementById("categories");
// let categories = [];

// const displayCategories = async () => {
//     categories = await getData(categories);

//     for (const category of categories) {
//         const categoryElt = document.createElement("button");

//         categoryElt.setAttribute("data-category-id", category.id);
//         categoryElt.className = "category_btn";
//         categoryElt.addEventListener("click", () =>
//             filterWorks(category.id, categoryElt)
//         );

//         categoryElt.textContent = category.name;
//         categoryElt.appendChild(categoryElt);
//     }
// }

// const filterElt = document.getElementById("filter");

// ******** PRIMARY MODAL ********

// const openModal = () => {
//     let deleteBtn = [];

    /
    // document.getElementById("modal").style.transform = "translateY(0)";

    // const ModalImages = document.getElementById("modal-images")
    // ModalImages.innerHTML = "";

//     works.forEach((work) => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//             <img src="${work.imageUrl}">
//             <span class = "delete><i class="fa-solid fa-trash-can"></i></span>
//         `;
//         ModalImages.appendChild(li);
//     });
//     const deleteWorks = document.getElementByClassName("delete");
//     deleteBtn = [...deleteWorks];

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

// const closeModal = () => {
//     document.getElementById("modal").style.display = "none";
//     document.getElementById("modal").style.opacity = "0";
    // document.getElementById("modal").style.transform = "translateY(-100%)";
// }

// const returnModal = () => {
//     document.getElementById("overflow-modal").style.display = "none";
//     document.getElementById("overflow-modal").style.opacity = "0";
//     document.getElementById(modal).style.display = "block";
//     document.getElementById(modal).style.opacity = "1";
// }

// ******** SECONDARY MODAL ********







