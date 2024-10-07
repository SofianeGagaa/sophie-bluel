"use strict";

// ******** CONSTANTS ******** //
const URL = "http://localhost:5678/api/users/login";

const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

// ******** FUNCTIONS ******** //

const login = async () => {
    const user = {
        email: email.value,
        password: password.value,
    };

    try {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            error.textContent = "Identifiants invalides";
        }

    } catch (error) {
        console.error("Erreur lors de la connexion : " + error);
    }
};

// ******** EVENT LISTENERS ******** //
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    login();
});
