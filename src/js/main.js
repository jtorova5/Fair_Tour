// imports
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'


/* import urls */
import { URL } from "./api/URLS.js";

/* global variables */
let datosGeneral

/* data that comes from the document */
let bodyCard = document.querySelector('#contenedor__img')
let botonAlone = document.querySelector('#btn-solo')
let botonCouple = document.querySelector('#btn-pareja')
let botonFamily = document.querySelector('#btn-familiar')


/* funtion find tours --------------------------*/
async function findTours() {
    let response = await fetch(URL)
    let datos = await response.json()
    datosGeneral = datos
    paintTours(datos)
    /* return datos */
}

findTours()

/* click alone ----------------------------*/
botonAlone.addEventListener('click', () => {
    filterSolo(datosGeneral)
})

/* search for alone tour */
function filterSolo(datosGeneral) {
    let planAlone = datosGeneral.filter((e) => e.plan == "solo")
    console.log(planAlone);
    paintTours(planAlone)
}

/* click couple -------------------------------*/
botonCouple.addEventListener('click', () => {
    filterCouple(datosGeneral)
})

/* search for couple  tour*/
function filterCouple(datosGeneral) {
    let planCouple = datosGeneral.filter((e) => e.plan == "parejas")
    paintTours(planCouple)
}

/* click family ---------------------------------*/
botonFamily.addEventListener('click', () => {
    filterFamily(datosGeneral)
})

/* search for family tour*/
function filterFamily(datosGeneral) {
    let planFamily = datosGeneral.filter((e) => e.plan == "familiar")
    paintTours(planFamily)
}

/* paint tours -----------------------------*/
function paintTours(datos) {
    bodyCard.innerHTML = "";

    for (let i = 0; i < datos.length; i++) {
        const divImage = document.createElement("div");
        divImage.classList.add("col-11", "w-100", "mt-2", "item");
        divImage.id = "div__image";
        /* asigno de forma dinámica el evento onclick a los elementos generados. */
        divImage.onclick = function () {
            seeMore(datos[i]);
        };

        divImage.innerHTML = `
            <img src="${datos[i].landingImg}" alt="${datos[i].tour}" class="imagen-contenedor rounded-4">
            <div id="divimage__hover" data-id="${datos[i].id}" class="rounded-4">
            <h4>${datos[i].tour}<br></h4>
            <h3 data-i18n="hover"></h3>
            </div>`;

        bodyCard.appendChild(divImage);
    }
}

/* click see more------------------------- */
function seeMore(objeto) {
    console.log("Oprimiste");
    console.log("Datos recibidos:", objeto);

    // Almacena el objeto en localStorage
    localStorage.setItem('selectedObject', JSON.stringify(objeto));

    // Navega a la nueva página
    window.location.href = 'http://localhost:5173/src/pages/tours.html';
}

// painting stars
function pintarEstrellas(numeroTestimonio, numEstrellas) {
    var inputs = document.querySelectorAll('input[name="rate' + numeroTestimonio + '"]');
    inputs.forEach(function (input, index) {
        if (index < numEstrellas) {
            input.checked = true
        }
    })
}

pintarEstrellas(1, 2)
pintarEstrellas(2, 1)
pintarEstrellas(3, 2)

// dark mode------------------------------------------------------------
document.getElementById("toggle-checkbox").addEventListener("change", function () {
    // let toggle = document.getElementById("toggle-checkbox")
    let navbar = document.getElementById("navbar")
    navbar.classList.toggle("bg-dark")
    // color change to the body
    document.body.classList.toggle("bg-dark")
    let footer = document.getElementById("footer")
    footer.classList.toggle("bg-dark")
})


// JavaScript para ocultar el preloader cuando la página esté completamente cargada
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
