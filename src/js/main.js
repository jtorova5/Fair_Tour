
// imports
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'


// mode dark------------------------------------------------------------
document.getElementById("toggle-checkbox").addEventListener("change", function () {
    let toggle = document.getElementById("toggle-checkbox");
    // color change to the body
    document.body.classList.toggle("bg-dark");
});