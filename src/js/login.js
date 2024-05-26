import {alertError, showSmallAlertSuccess} from './alerts.js'

const url = `http://localhost:3000/admin`; // URL  del JSON server
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const isAuthenticated = await checkUsernameAndPassword(username.value, password.value);
    if (isAuthenticated) {
        window.location.href = "/index.html";

    } else {
        alertError("Usuario o contraseña incorrectos. No puedes ingresar.");
    }
});

async function checkUsernameAndPassword(username, password) {
    const response = await fetch(url);
    const adminData = await response.json();
    
    // Verifica si las credenciales coinciden con las almacenadas en el JSON server
    const admin = adminData.find(user => user.usuario === username && user.contraseña === password);
    return !!admin;
}












async function checkUsername(username) {
    //traemos a todos los usuarios que tengan el username ingresado
    const response = await fetch(`${url}?username=${username.value}`)
    const datos = await response.json()

    if (datos.length === 1) {
        return datos[0]
        
    } else {
        return false
        
    }
    
}