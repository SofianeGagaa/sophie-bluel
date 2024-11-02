"use strict";

// ******** CONSTANTS ******** //
const URL = "http://localhost:5678/api/users/login";

const email = document.querySelector("#email");
// const form = document.getElementById("login");
const password = document.querySelector("#password");
const error = document.querySelector("#error");
const submit = document.querySelector('[type="submit"]');

// ******** FUNCTIONS ******** //

const userLoginData = async () => {
    console.log("user test");
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    };

    const response = await fetch(URL, options);

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

submit.addEventListener("click", async  (event)  =>{
    event.preventDefault();
    await userLoginData();
});


// const loginData = async () => {
//     const user = {
//         email: email.value,
//         password: password.value,
//     };

//     try {
//         const response = await fetch(URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user),
//             // stringify(loginData),
//         });

//         if (response.ok) {
//             const data = await response.json();

//             localStorage.setItem("token", data.token);
//             window.location.href = "index.html";
//         } else {
//             error.textContent = "Identifiants invalides";
//         }

//     } catch (error) {
//         console.error("Erreur lors de la connexion : " + error);
//     }
// };

// // ******** EVENT LISTENERS ******** //
// form.addEventListener("submit", async function (event) {
//     event.preventDefault();
//     loginData();
// });
