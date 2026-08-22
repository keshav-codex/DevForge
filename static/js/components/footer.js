/* ==========================================================================
   DEVFORGE — FOOTER
   ========================================================================== */


/* ==========================================================================
   MOBILE FOOTER ACCORDION
   ========================================================================== */

const footerTitles = document.querySelectorAll(
    ".footer-column-title, .footer-social-title"
);

footerTitles.forEach((title) => {

    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.setAttribute("aria-expanded", "false");

    const section = title.parentElement;

    if (!section) {
        return;
    }

    const toggleFooterSection = () => {

        /*
         * Only use accordion behaviour on mobile.
         * Desktop footer remains fully visible.
         * Must match CSS breakpoint (max-width: 600px).
         */

        if (window.innerWidth > 600) {
            return;
        }

        const isOpen = section.classList.toggle("is-open");

        title.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    };


    title.addEventListener("click", toggleFooterSection);


    title.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            toggleFooterSection();
        }

    });

});


/* ==========================================================================
   RESET FOOTER ACCORDION WHEN RETURNING TO DESKTOP
   ========================================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 600) {

        document
            .querySelectorAll(
                ".footer-contact, .footer-legal, .footer-support, .footer-social"
            )
            .forEach((section) => {

                section.classList.remove("is-open");

                const title = section.querySelector(
                    ".footer-column-title, .footer-social-title"
                );

                if (title) {
                    title.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

    }

});