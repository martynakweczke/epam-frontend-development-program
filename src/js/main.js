const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("burger-menu-expanded");
});
