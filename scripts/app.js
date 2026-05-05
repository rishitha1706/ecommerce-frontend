const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

menu.addEventListener("click", () => {
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
    }
});