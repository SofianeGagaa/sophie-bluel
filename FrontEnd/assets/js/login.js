"use strict";

// ******** CONSTANTS ******** //
/*** const URL = "http://localhost:5678/api/users/login";

const email = document.querySelector("#email");
const form = document.getElementById("login");
const password = document.querySelector("#password");
const error = document.querySelector("#error");
const submit = document.querySelector('[type="submit"]'); ***/

// ******** FUNCTIONS ******** //

/*** const userLogin = async () => { 
    /*** console.log("let's go"); ***/
    /***
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    }; ***/

    /*** const response = await fetch(URL, options); ***/
    /***
    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        document.location.href = "index.html";

    } else {
        throw alert("Identifiant ou mot de passe invalides");
    } 
}; 

// ******** EVENT LISTENERS ******** //
/***
submit.addEventListener("click", async  (event)  =>{
    event.preventDefault();
    await userLogin();
}); ***/


// ******** CONSTANTS ******** //

const URL = 'http://localhost:5678/api/users/login';

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("login");
const error = document.getElementById('error');


// ********** FUNCTION ********** //

/**
 * Permet de se connecter
 * Avec les informations de l'utilisateur
 * En envoyant une requête POST
 * Puis en enregistrant le token dans le localStorage
 * Et de rediriger vers l'accueil
 */

const login = async () => {
    const credentials = {
      email: email.value,
      password: password.value,
    };
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
        
      } else {
        error.textContent = "mot de passe ou email incorrect";
      }
  
    } catch (error) {
      console.log('Erreur lors de la tentative de connexion:', error);
    }
  }

// ********** MAIN ********** //

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    login();
  });
  
