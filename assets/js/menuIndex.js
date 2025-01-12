var menu = document.getElementById("menu");
var headerMenuIndex = document.getElementById("headerMenuIndex");
var menuOpenIndex = document.getElementById("menuOpenIndex");

document.getElementById("menuOpenIndex").addEventListener("click", toogleMenu);

document.getElementById("menuClose").addEventListener("click", toogleMenu);

function toogleMenu() {
    menu.classList.toggle("open");
    headerMenuIndex.classList.toggle("open");
}