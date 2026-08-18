/* =========================================================
   MAP ACTIVITY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Get form elements.
     */
    const statusField = document.getElementById("location-status");

    const descriptionField = document.getElementById(
        "location-description"
    );

    const descriptionLabel = document.getElementById(
        "location-description-label"
    );

    const placeNameField = document.getElementById(
        "location-place-name"
    );

    const addressField = document.getElementById(
        "location-address"
    );

    const latitudeField = document.getElementById(
        "location-latitude"
    );

    const longitudeField = document.getElementById(
        "location-longitude"
    );

    const locationForm = document.getElementById("location-form");

    const searchInput = document.getElementById(
        "location-search-input"
    );

    const searchButton = document.getElementById(
        "location-search-button"
    );

    const searchMessage = document.getElementById(
        "location-search-message"
    );

    const placeNameError = document.getElementById(
        "location-place-name-error"
    );

    let locationSelected = false;

    /* =========================================================
    FORM VALIDATION
    ========================================================= */

    if (locationForm) {

    locationForm.addEventListener("submit", function (event) {

        let isValid = true;

        /*
         * Validate place name.
         */
        const placeName = placeNameField.value.trim();

        if (!placeName) {

            placeNameError.textContent =
                "Please enter a place name.";

            placeNameField.classList.add(
                "field-invalid"
            );

            isValid = false;

        } else if (placeName.length > 255) {

            placeNameError.textContent =
                "Place name cannot exceed 255 characters.";

            placeNameField.classList.add(
                "field-invalid"
            );

            isValid = false;

        } else {

            placeNameError.textContent = "";

            placeNameField.classList.remove(
                "field-invalid"
            );
        }


        /*
         * Validate map selection.
         */
        if (
            !locationSelected ||
            !latitudeField.value ||
            !longitudeField.value ||
            !addressField.value.trim()
        ) {

            searchMessage.textContent =
                "Please select a location on the map.";

            isValid = false;
        }


        /*
         * Stop form submission if validation fails.
         */
        if (!isValid) {
            event.preventDefault();
        }

    });
    }
    /* =====================================================
       DESCRIPTION / PLAN
    ===================================================== */

    function updateDescriptionField() {

        if (!statusField || !descriptionField) {
            return;
        }

        if (statusField.value === "visited") {

            descriptionLabel.textContent = "Description";

            descriptionField.placeholder =
                "Describe your experience at this place.";

        } else if (statusField.value === "planned") {

            descriptionLabel.textContent = "Plan";

            descriptionField.placeholder =
                "Describe your plan for this place.";

        } else {

            descriptionLabel.textContent = "Description";

            descriptionField.placeholder =
                "Add details about this place.";
        }
    }


    if (statusField) {

        statusField.addEventListener(
            "change",
            updateDescriptionField
        );

        updateDescriptionField();
    }


    /* =====================================================
       MAP
    ===================================================== */

    const mapElement = document.getElementById("location-map");

    if (!mapElement) {
        return;
    }


    /*
     * Initialize map.
     *
     * Leaflet must be loaded by the template/base.html
     * before this file runs.
     */
    const map = L.map("location-map").setView(
        [28.6139, 77.2090],
        10
    );


    /*
     * OpenStreetMap tiles.
     */
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    let marker = null;


    /* =====================================================
       MAP CLICK
    ===================================================== */

    map.on("click", async function (event) {

        locationSelected = true;

        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;

        if (successMessage) {
            successMessage.remove();
        }

        if (errorMessage) {
            errorMessage.remove();
        }


        /*
         * Store coordinates in hidden form fields.
         */
        latitudeField.value = latitude.toFixed(7);

        longitudeField.value = longitude.toFixed(7);


        /*
         * Create or move marker.
         */
        if (marker) {

            marker.setLatLng([
                latitude,
                longitude
            ]);

        } else {

            marker = L.marker([
                latitude,
                longitude
            ]).addTo(map);
        }


        /*
         * Get address from reverse geocoding.
         */
        await getAddress(
            latitude,
            longitude
        );
    });


    /* =====================================================
       REVERSE GEOCODING
    ===================================================== */

    async function getAddress(latitude, longitude) {

        /*
         * Show temporary status.
         */
        addressField.value = "Finding address...";


        try {

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                {
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Unable to find address."
                );
            }


            const data = await response.json();


            /*
             * Use the formatted address returned
             * by Nominatim.
             */
            addressField.value =
                data.display_name || "Address unavailable";


            /*
             * If place name is empty, use the
             * reverse-geocoded place name.
             */
            if (
                placeNameField &&
                !placeNameField.value.trim()
            ) {

                const address = data.address || {};

                placeNameField.value =
                    address.tourism ||
                    address.amenity ||
                    address.building ||
                    address.city ||
                    address.town ||
                    address.village ||
                    "";
            }


        } catch (error) {

            console.error(
                "Reverse geocoding error:",
                error
            );

            addressField.value =
                "Unable to determine address.";
        }
    }


    /* =====================================================
       AI ASSIST
    ===================================================== */

    const aiButton = document.getElementById(
        "location-ai-button"
    );


    if (aiButton) {

        aiButton.addEventListener(
            "click",
            function () {

                /*
                 * AI backend will be connected later
                 * through the AI Activity system.
                 */
                console.log(
                    "Location AI Assist requested."
                );
            }
        );
    }

    /* =========================================================
    CLEAR FORM MESSAGES
    ========================================================= */

    const locationForm = document.getElementById("location-form");

    const successMessage = document.querySelector(
        "#location-activity-page .message.success"
    );

    const errorMessage = document.querySelector(
        "#location-activity-page .message.error"
    );


    if (locationForm) {

        locationForm.addEventListener("input", function () {

            /*
            * Remove success/error messages when
            * the user starts entering information.
            */
            if (successMessage) {
                successMessage.remove();
            }

            if (errorMessage) {
                errorMessage.remove();
            }

        });

    }

    /* =========================================================
   PLACE SEARCH
========================================================= */

async function searchLocation() {

    const query = searchInput.value.trim();

    if (!query) {

        searchMessage.textContent =
            "Enter a place to search.";

        return;
    }


    searchMessage.textContent =
        "Searching...";


    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=1`,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (!response.ok) {
            throw new Error("Search failed.");
        }


        const results = await response.json();


        if (!results.length) {

            searchMessage.textContent =
                "No location found.";

            return;
        }


        const result = results[0];

        const latitude = parseFloat(result.lat);
        const longitude = parseFloat(result.lon);


        /*
         * Move map to searched location.
         */
        map.setView(
            [latitude, longitude],
            16
        );


        /*
         * Create or move marker.
         */
        if (marker) {

            marker.setLatLng([
                latitude,
                longitude
            ]);

        } else {

            marker = L.marker([
                latitude,
                longitude
            ]).addTo(map);
        }


        /*
         * Store coordinates.
         */
        latitudeField.value =
            latitude.toFixed(7);

        longitudeField.value =
            longitude.toFixed(7);


        /*
         * Mark location as selected.
         */
        locationSelected = true;


        /*
         * Fill address.
         */
        addressField.value =
            result.display_name;


        /*
         * Fill place name if empty.
         */
        if (!placeNameField.value.trim()) {

            placeNameField.value =
                result.display_name
                    .split(",")[0]
                    .trim();
        }


        searchMessage.textContent =
            "Location selected.";


        } catch (error) {

            console.error(
                "Location search error:",
                error
            );

            searchMessage.textContent =
                "Unable to search for this location.";
        }
    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchLocation
        );
    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchLocation();
                }
            }
        );
    }

});