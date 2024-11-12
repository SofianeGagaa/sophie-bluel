"use strict";

// ******** CONSTANTS ********
const URL = "http://localhost:5678/api/";

const worksElements = document.getElementById("works");
const filtersElements = document.getElementById("filters");

// ******** VARIABLES ********
let works = [];
let categories = [];
let token = "";
let file;

// ******** FUNCTIONS ********

/** Récuperer les données de l'API */
const getData = async (type) => {
  try {
      const response = await fetch(URL + type);
      const data = await response.json();

      return data;

  } catch (error) {
      console.error(error);
  }
}

/** Affichage des projets de la gallerie */
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

/** Affichage des filtres des categories */
const displayCategories = async () => {
  categories = await getData("categories");
  // console.log(categories);

  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.className = "btn-filters";

  const allListElt = document.createElement("li");
  // console.log(allListElt);
  allListElt.appendChild(allButton);
  filtersElements.appendChild(allListElt);

  for (const category of categories) {
    const btnFiltered = document.createElement("button");
    // console.log(btnFiltered);

    btnFiltered.setAttribute("data-category", category.id);
    btnFiltered.className = "filters-btn";

    btnFiltered.addEventListener("click", () =>
      filterWorks(category.id, btnFiltered)
    );
    btnFiltered.textContent = category.name;
    filtersElements.appendChild(btnFiltered);

  }
}

/** Administrer la deconnection de l'utilisateur */
const logout = () => {
  localStorage.removeItem('token');
  document.getElementById('login-url').style.display = 'block';
  document.getElementById('logout').style.display = 'none';
}

/** fonction de filtrage */
const filterWorks = (categoryId, button) => {
  const worksdoc = document.getElementById('work');
  worksdoc.innerHTML = '';
  
/** Filtrer les travaux en fonction de l'ID de catégorie */
  const filteredWorks = works.filter((work) => work.categoryId === categoryId);
  /** Ajouter les éléments filtrés au DOM */
  filteredWorks.forEach((work) => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
      `;
    worksdoc.appendChild(figure);
  });
  
  document.querySelectorAll('.filters-btn').forEach((btn) => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
  document.getElementById('all-work').classList.remove('btn-all');
};

// *** MODIFY  FIRST MODAL ***//

/** Ouverture et modification de la modal et affichage des "works", avec suppression  des bouttons */
const modifyModal = () => {
  let deleteBtn = [];
  
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal').style.opacity = 1;
  
  const modalImages = document.getElementById('modal-images')
  modalImages.innerHTML = '';
  
  works.forEach((work) => {
    const li = document.createElement('li');
    li.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}">
          <span class="delete"><i class="fa-solid fa-trash-can"></i><span>
        `;
    modalImages.appendChild(li);
  });
  const deleteWorks = document.getElementsByClassName('delete');
  deleteBtn = [...deleteWorks]
  
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', async function () {
      if (confirm('Voulez-vous supprimer cette image ?')) {
  
        try {
          response = await fetch(`http://localhost:5678/api/works/{works[i].id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        } catch (error) {
  
        }
      }
    })
   }
}


// *** Fermeture de la modal ***//
const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal').style.opacity = 0;
}
  
// *** Retourner à la modal en cachant l'overflow ***//
const returnToModal = () => {
  document.getElementById("overflow-modal").style.display = "none";
  document.getElementById("overflow-modal").style.opacity = 0;
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal").style.opacity = 1;
}
  
  // *****  MODIFY SECOND MODAL *****
  
  /** Afficher pour modifier la Second Modal */
const modifySecondModal = () => {
  document.getElementById("overflow-modal").style.display = "block";
  document.getElementById("overflow-modal").style.opacity = 1;
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal").style.opacity = 0;

  const categoriesElement = document.getElementById('category');
  categoriesElement.innerHTML = '';
  const emptyOptions = document.createElement('option');
  categoriesElement.appendChild(emptyOptions);

  for (const category of categories) {
    const option = document.createElement('option');
    option.textContent = category.name;
    option.setAttribute('value', category.id);
  
    categoriesElement.appendChild(option);
  }
};

  /** fermeture de Second Modal */
const closeSecondModal = () => {
  document.getElementById("overflow-modal").style.display = "none";
  document.getElementById("overflow-modal").style.opacity = 0;
  }
/** Afficher l'image dans le modal */
const selectImage = () => {
  const fileInput = document.getElementById('fileInput');
  
  fileInput.addEventListener('change', (event) => {
    event.stopPropagation();
    file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      /** Définir et lire la src d'une image et la cacher */
      reader.onload = (e) => {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.maxWidth = '100%';
        document.getElementById('imageContainer').innerHTML = '';
        document.getElementById('imageContainer').appendChild(imgElement);
        document.getElementById('imageIcon').style.display = 'none';
        document.getElementById('imageContainer').style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  
  fileInput.click();
};
  
/** Soumettre le "work" au serveur */
const submitWork = async (event) => {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  
  if (!file || !title || !category) {
    const error = document.getElementById('error_submit');
    const span = document.createElement('span');
    span.textContent = 'Vérifier que tous les champs sont corrects';
    span.style.color = 'red';
    span.style;
    error.appendChild(span);
    return;
  } else {
    const url = URL + 'works';
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', file);
  
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      // const  data = await response.json();
  
  } catch (error) {
      console.error(error);
    }
  }
};

// ********** MAIN MODALS********** //

displayWorks();
displayCategories();

document.getElementById('return-second-modal')
  .addEventListener('click', returnToModal);

document.getElementById('add-photo')
  .addEventListener('click', modifySecondModal);

document.getElementById('second-close-modal')
  .addEventListener('click', closeSecondModal);

//*****  MODIFY BUTTON COLOR *****//

document.addEventListener('DOMContentLoaded', function () {
  const titleInput = document.getElementById('title');
  const fileInput = document.getElementById('fileInput');
  const categorySelect = document.getElementById('category');
  const submitButton = document.getElementById('create-works');
  
  function checkInputs() {
    const titleValue = titleInput.value.trim();
    const categoryValue = categorySelect.value.trim();
    const fileValue = fileInput.files.length > 0;
  
    if (titleValue !== '' && categoryValue !== '' && fileValue) {
      submitButton.disabled = false;
      submitButton.classList.remove('unenabled-button');
      submitButton.classList.add('enabled-button');
    } else {
      submitButton.disabled = true;
      submitButton.classList.add('unenabled-button');
      submitButton.classList.remove('enabled-button');
    }
  }
  
  titleInput.addEventListener('input', checkInputs);
  categorySelect.addEventListener('change', checkInputs);
  fileInput.addEventListener('change', checkInputs);
});
  
document.getElementById('add-photo-modal').addEventListener('click', selectImage);
  
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('modify-modal').addEventListener('click', modifyModal);
  
document.addEventListener('DOMContentLoaded', function () {
  token = localStorage.getItem('token');
  
  if (token) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('filters').style.display = 'none';
    } else {
    document.getElementById('modify-modal').style.display = 'none'
    document.getElementById('modify').style.display = 'none'; 
}

  displayWorks();
  displayCategories();
  
  document.getElementById('imageContainer').style.display = 'none';
});
  
document.getElementById('create-works-form')
  .addEventListener('submit', async (event) => {
    submitWork(event);
  });
  
document.getElementById('filters').addEventListener('click', () => {
  const worksdoc = document.getElementById('works');
  worksdoc.innerHTML = '';
  works.forEach((work) => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
      `;
    worksdoc.appendChild(figure);
  });
  
  document.getElementById('all-work').classList.add('btn-all');
  document.querySelectorAll('.filters-btn').forEach((btn) => {
    btn.classList.remove('active');
  });
});
   

 