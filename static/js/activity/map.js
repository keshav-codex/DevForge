/* =========================================================
   MAP ACTIVITY
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const locationForm = document.getElementById("location-form");

const placeNameField = document.getElementById(
    "location-place-name"
);

const placeNameError = document.getElementById(
    "location-place-name-error"
);

const statusField = document.getElementById(
    "location-status"
);

const descriptionField = document.getElementById(
    "location-description"
);

const descriptionLabel = document.getElementById(
    "location-description-label"
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

const searchInput = document.getElementById(
    "location-search-input"
);

const searchButton = document.getElementById(
    "location-search-button"
);

const searchMessage = document.getElementById(
    "location-search-message"
);

const aiButton = document.getElementById(
    "location-ai-button"
);


/* =========================================================
   STATE
========================================================= */

let locationSelected = false;
let marker = null;


/* =========================================================
   MAP INITIALIZATION
========================================================= */

const mapElement = document.getElementById(
    "location-map"
);

let map = null;


if (mapElement) {

    map = L.map("location-map").setView(
        [28.6139, 77.2090],
        12
    );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    /*
     * Select location by clicking the map.
     */
    map.on("click", async function (event) {

        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;

        selectLocation(
            latitude,
            longitude
        );

        await reverseGeocode(
            latitude,
            longitude
        );

    });
}


/* =========================================================
   SELECT LOCATION
========================================================= */

function selectLocation(
    latitude,
    longitude
) {

    locationSelected = true;


    /*
     * Create marker if it doesn't exist.
     * Otherwise move existing marker.
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
     * Remove map validation message.
     */
    if (searchMessage) {

        searchMessage.textContent = "";
    }
}


/* =========================================================
   REVERSE GEOCODING
========================================================= */

async function reverseGeocode(
    latitude,
    longitude
) {

    if (searchMessage) {

        searchMessage.textContent =
            "Getting address...";
    }


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
                "Reverse geocoding failed."
            );
        }


        const result =
            await response.json();


        if (addressField) {

            addressField.value =
                result.display_name || "";
        }


        /*
         * Automatically suggest place name
         * only when the user hasn't entered one.
         */
        if (
            placeNameField &&
            !placeNameField.value.trim()
        ) {

            if (result.name) {

                placeNameField.value =
                    result.name;
            }
        }


        if (searchMessage) {

            searchMessage.textContent =
                "Location selected.";
        }

    } catch (error) {

        console.error(
            "Reverse geocoding error:",
            error
        );

        if (searchMessage) {

            searchMessage.textContent =
                "Location selected, but address could not be retrieved.";
        }
    }
}


/* =========================================================
   PLACE SEARCH
========================================================= */

async function searchLocation() {

    if (!searchInput) {
        return;
    }


    const query =
        searchInput.value.trim();


    if (!query) {

        searchMessage.textContent =
            "Enter a place to search.";

        return;
    }


    searchMessage.textContent =
        "Searching...";


    searchButton.disabled = true;


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

            throw new Error(
                "Search request failed."
            );
        }


        const results =
            await response.json();


        if (!results.length) {

            searchMessage.textContent =
                "No location found.";

            return;
        }


        const result =
            results[0];


        const latitude =
            parseFloat(result.lat);

        const longitude =
            parseFloat(result.lon);


        /*
         * Move map.
         */
        map.setView(
            [latitude, longitude],
            16
        );


        /*
         * Create or move marker.
         */
        selectLocation(
            latitude,
            longitude
        );


        /*
         * Fill address immediately.
         */
        addressField.value =
            result.display_name || "";


        /*
         * Fill place name only if empty.
         */
        if (
            !placeNameField.value.trim()
        ) {

            placeNameField.value =
                result.name ||
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

    } finally {

        searchButton.disabled = false;
    }
}


/* =========================================================
   SEARCH EVENTS
========================================================= */

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


/* =========================================================
   STATUS → DESCRIPTION LABEL
========================================================= */

function updateDescriptionLabel() {

    if (!statusField || !descriptionLabel) {
        return;
    }


    if (statusField.value === "visited") {

        descriptionLabel.textContent =
            "Visit Description";

        descriptionField.placeholder =
            "Describe your visit to this place.";

    } else if (statusField.value === "planned") {

        descriptionLabel.textContent =
            "Visit Plan";

        descriptionField.placeholder =
            "Describe your plan for visiting this place.";

    } else {

        descriptionLabel.textContent =
            "Description";

        descriptionField.placeholder =
            "Add details about this place.";
    }
}


if (statusField) {

    statusField.addEventListener(
        "change",
        updateDescriptionLabel
    );

    updateDescriptionLabel();
}


/* =========================================================
   CLEAR VALIDATION / MESSAGES WHEN USER EDITS
========================================================= */

if (locationForm) {

    locationForm.addEventListener(
        "input",
        function () {

            if (placeNameError) {

                placeNameError.textContent =
                    "";
            }


            if (placeNameField) {

                placeNameField.classList.remove(
                    "field-invalid"
                );
            }


            if (searchMessage) {

                searchMessage.textContent =
                    "";
            }
        }
    );
}


/* =========================================================
   FORM VALIDATION
========================================================= */

if (locationForm) {

    locationForm.addEventListener(
        "submit",
        function (event) {

            let isValid = true;


            /*
             * Place name.
             */
            const placeName =
                placeNameField.value.trim();


            if (!placeName) {

                placeNameError.textContent =
                    "Please enter a place name.";

                placeNameField.classList.add(
                    "field-invalid"
                );

                isValid = false;

            } else if (
                placeName.length > 255
            ) {

                placeNameError.textContent =
                    "Place name cannot exceed 255 characters.";

                placeNameField.classList.add(
                    "field-invalid"
                );

                isValid = false;

            } else {

                placeNameError.textContent =
                    "";

                placeNameField.classList.remove(
                    "field-invalid"
                );
            }


            /*
             * Status.
             */
            if (
                statusField.value !== "visited" &&
                statusField.value !== "planned"
            ) {

                isValid = false;
            }


            /*
             * Map selection.
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
             * Stop submission if invalid.
             */
            if (!isValid) {

                event.preventDefault();
            }
        }
    );
}


/* =========================================================
   AI ASSISTANT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const aiButton =
            document.getElementById(
                "location-ai-button"
            );

        const aiPanel =
            document.getElementById(
                "location-ai-panel"
            );

        const aiInstruction =
            document.getElementById(
                "location-ai-instruction"
            );

        const aiGenerateButton =
            document.getElementById(
                "location-ai-generate"
            );

        const aiMessage =
            document.getElementById(
                "location-ai-message"
            );

        const placeName =
            document.getElementById(
                "location-place-name"
            );

        const status =
            document.getElementById(
                "location-status"
            );

        const description =
            document.getElementById(
                "location-description"
            );

        /* =====================================================
        CLEAR AI MESSAGE WHEN USER STARTS TYPING
        ===================================================== */

        if (aiInstruction && aiMessage) {

            aiInstruction.addEventListener(
                "input",
                function () {

                    aiMessage.textContent = "";
                    aiMessage.className =
                        "location-ai-message";

                }
            );

        }


        /* =====================================================
           OPEN / CLOSE AI ASSISTANT
        ===================================================== */

        if (aiButton && aiPanel) {

            aiButton.addEventListener(
                "click",
                function () {

                    aiPanel.hidden =
                        !aiPanel.hidden;

                    if (!aiPanel.hidden && aiInstruction) {

                        aiInstruction.focus();

                    }

                }
            );

        }


        /* =====================================================
           GENERATE DESCRIPTION
        ===================================================== */

        if (aiGenerateButton) {

            aiGenerateButton.addEventListener(
                "click",
                async function () {

                    /*
                     * Clear previous AI message.
                     */

                    if (aiMessage) {

                        aiMessage.textContent = "";

                        aiMessage.className =
                            "location-ai-message";

                    }


                    const place =
                        placeName
                            ? placeName.value.trim()
                            : "";

                    const locationStatus =
                        status
                            ? status.value
                            : "";

                    const instruction =
                        aiInstruction
                            ? aiInstruction.value.trim()
                            : "";

                    const existingDescription =
                        description
                            ? description.value.trim()
                            : "";


                    /* =================================================
                       VALIDATION
                    ================================================= */

                    if (!place) {

                        if (aiMessage) {

                            aiMessage.textContent =
                                "Please enter a place name.";

                            aiMessage.classList.add(
                                "error"
                            );

                        }

                        if (placeName) {

                            placeName.focus();

                        }

                        return;

                    }


                    if (!locationStatus) {

                        if (aiMessage) {

                            aiMessage.textContent =
                                "Please select Visited or Planned.";

                            aiMessage.classList.add(
                                "error"
                            );

                        }

                        if (status) {

                            status.focus();

                        }

                        return;

                    }


                    if (!instruction) {

                        if (aiMessage) {

                            aiMessage.textContent =
                                "Please enter an instruction.";

                            aiMessage.classList.add(
                                "error"
                            );

                        }

                        if (aiInstruction) {

                            aiInstruction.focus();

                        }

                        return;

                    }


                    /* =================================================
                       GENERATING
                    ================================================= */

                    aiGenerateButton.disabled =
                        true;

                    aiGenerateButton.textContent =
                        "Generating...";


                    try {

                        const formData =
                            new FormData();


                        formData.append(
                            "ai_action",
                            "location_description"
                        );

                        formData.append(
                            "place_name",
                            place
                        );

                        formData.append(
                            "status",
                            locationStatus
                        );

                        formData.append(
                            "description",
                            existingDescription
                        );

                        formData.append(
                            "ai_instruction",
                            instruction
                        );


                        /* =================================================
                           CSRF
                        ================================================= */

                        const csrfToken =
                            document.querySelector(
                                "#location-form input[name='csrfmiddlewaretoken']"
                            );


                        if (!csrfToken) {

                            throw new Error(
                                "CSRF token not found."
                            );

                        }


                        /* =================================================
                           AI REQUEST
                        ================================================= */

                        const response =
                            await fetch(
                                window.location.href,
                                {
                                    method: "POST",

                                    body: formData,

                                    headers: {
                                        "X-CSRFToken":
                                            csrfToken.value,

                                        "X-Requested-With":
                                            "XMLHttpRequest"
                                    }
                                }
                            );


                        const data =
                            await response.json();


                        /* =================================================
                           RESPONSE
                        ================================================= */

                        if (
                            !response.ok ||
                            !data.success
                        ) {

                            throw new Error(
                                data.error ||
                                "Unable to generate description."
                            );

                        }


                        /* =================================================
                           PUT AI RESPONSE INTO DESCRIPTION
                        ================================================= */

                        if (description) {

                            description.value =
                                data.description || "";

                            description.focus();

                            description.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }


                        if (aiMessage) {

                            aiMessage.textContent =
                                "Description generated successfully.";

                            aiMessage.classList.add(
                                "success"
                            );

                        }


                    } catch (error) {

                        console.error(
                            "LOCATION AI ERROR:",
                            error
                        );


                        if (aiMessage) {

                            aiMessage.textContent =
                                error.message ||
                                "Unable to generate description. Please try again.";

                            aiMessage.classList.add(
                                "error"
                            );

                        }


                    } finally {

                        aiGenerateButton.disabled =
                            false;

                        aiGenerateButton.textContent =
                            "Generate Description";

                    }

                }
            );

        }

    }
);