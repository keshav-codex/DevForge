const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("is-open");

        navToggle.classList.toggle("is-open", isOpen);

        navToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}