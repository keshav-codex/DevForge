document.addEventListener("DOMContentLoaded", () => {

    const reportContent = document.getElementById(
        "map-report-content"
    );

    const paginationContainer = document.getElementById(
        "map-report-pagination"
    );


    /*
     * Load map reports from the DRF API.
     */
    async function loadMapReports(url) {

        showLoading();

        try {

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });


            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }


            const data = await response.json();

            renderMapReports(data);
            renderPagination(data);


        } catch (error) {

            console.error(
                "Error loading map reports:",
                error
            );

            showError();
        }
    }


    /*
     * Loading state.
     */
    function showLoading() {

        reportContent.innerHTML = `
            <div class="card">

                <p class="card-description">
                    Loading map reports...
                </p>

            </div>
        `;

        paginationContainer.innerHTML = "";
    }


    /*
     * Error state.
     */
    function showError() {

        reportContent.innerHTML = `
            <div class="card">

                <h2 class="card-title">
                    Unable to load reports
                </h2>

                <p class="card-description">
                    Something went wrong while loading
                    your map reports.
                </p>

            </div>
        `;

        paginationContainer.innerHTML = "";
    }


    /*
     * Render location records.
     */
    function renderMapReports(data) {

        reportContent.innerHTML = "";


        if (!data.results || data.results.length === 0) {

            reportContent.innerHTML = `
                <div class="card">

                    <h2 class="card-title">
                        No Location Activity
                    </h2>

                    <p class="card-description">
                        No map or location reports are
                        available yet.
                    </p>

                </div>
            `;

            return;
        }


        data.results.forEach((location) => {

            const locationCard =
                createLocationCard(location);

            reportContent.appendChild(locationCard);

        });
    }


    /*
     * Create one location report card.
     */
    function createLocationCard(location) {

        const card = document.createElement("article");

        card.className = "card map-report-card";


        const placeName =
            location.place_name || "Unknown Place";

        const status =
            location.status || "unknown";

        const description =
            location.description || "No description available.";

        const address =
            location.address || "No address available.";

        const latitude =
            location.latitude ?? "—";

        const longitude =
            location.longitude ?? "—";

        const createdAt =
            formatDate(location.created_at);

        const updatedAt =
            formatDate(location.updated_at);


        card.innerHTML = `

            <div class="map-report-header">

                <h2 class="card-title">
                    ${escapeHTML(placeName)}
                </h2>

                <span class="map-report-status">
                    ${escapeHTML(status)}
                </span>

            </div>


            <div class="map-report-details">

                <p>
                    <strong>Description:</strong>
                    ${escapeHTML(description)}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${escapeHTML(address)}
                </p>

            </div>


            <div class="map-report-coordinates">

                <h3>
                    Coordinates
                </h3>

                <p>
                    <strong>Latitude:</strong>
                    ${escapeHTML(String(latitude))}
                </p>

                <p>
                    <strong>Longitude:</strong>
                    ${escapeHTML(String(longitude))}
                </p>

            </div>


            <div class="map-report-dates">

                <p>
                    <strong>Created:</strong>
                    ${escapeHTML(createdAt)}
                </p>

                <p>
                    <strong>Updated:</strong>
                    ${escapeHTML(updatedAt)}
                </p>

            </div>

        `;


        return card;
    }


    /*
     * Pagination.
     */
    function renderPagination(data) {

        paginationContainer.innerHTML = "";


        if (!data.next && !data.previous) {
            return;
        }


        const pagination =
            document.createElement("div");

        pagination.className =
            "report-pagination";


        if (data.previous) {

            const previousButton =
                document.createElement("button");

            previousButton.type = "button";

            previousButton.textContent = "Previous";

            previousButton.addEventListener(
                "click",
                () => loadMapReports(data.previous)
            );

            pagination.appendChild(
                previousButton
            );
        }


        if (data.next) {

            const nextButton =
                document.createElement("button");

            nextButton.type = "button";

            nextButton.textContent = "Next";

            nextButton.addEventListener(
                "click",
                () => loadMapReports(data.next)
            );

            pagination.appendChild(
                nextButton
            );
        }


        paginationContainer.appendChild(
            pagination
        );
    }


    /*
     * Format date.
     */
    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }


        const date =
            new Date(dateValue);


        if (Number.isNaN(date.getTime())) {
            return "—";
        }


        return date.toLocaleString();
    }


    /*
     * Prevent HTML injection.
     */
    function escapeHTML(value) {

        const element =
            document.createElement("div");

        element.textContent =
            value ?? "";

        return element.innerHTML;
    }


    /*
     * Initial API request.
     */
    loadMapReports(
        "/reports/api/map/"
    );

});
