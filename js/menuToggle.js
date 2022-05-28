const nav = document.querySelector(".nav");
const burgerMenu = nav.querySelector(".burger-menu");

const toggleMenu = () => {
    nav.classList.toggle("is-open");
};

burgerMenu.addEventListener("click", toggleMenu);

//Set active class for nav elements

const navList = document.querySelector(".nav_list");
const links = Array.from(navList.querySelectorAll(".nav_link"));

// links.forEach((link) => {
//     link.addEventListener("click", (e) => {
//         links.forEach((l) => l.classList.remove("active"));
//         link.classList.add("active");
//     });
// });

const addActiveClass = (e) => {
    const link = e.target.closest("li .nav_link");
    if (link) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
    }
};

navList.addEventListener("click", addActiveClass);
