document.addEventListener("DOMContentLoaded", () => {

    const reportContent = document.getElementById(
        "ai-report-content"
    );

    const paginationContainer = document.getElementById(
        "ai-report-pagination"
    );


    /*
     * Load AI reports from the DRF API.
     */
    async function loadAIReports(url) {

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

            renderAIReports(data);
            renderPagination(data);


        } catch (error) {

            console.error(
                "Error loading AI reports:",
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
                    Loading AI reports...
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
                    your AI reports.
                </p>

            </div>
        `;

        paginationContainer.innerHTML = "";
    }


    /*
     * Render AI records.
     */
    function renderAIReports(data) {

        reportContent.innerHTML = "";


        if (!data.results || data.results.length === 0) {

            reportContent.innerHTML = `
                <div class="card">

                    <h2 class="card-title">
                        No AI Activity
                    </h2>

                    <p class="card-description">
                        No AI interactions are available yet.
                    </p>

                </div>
            `;

            return;
        }


        data.results.forEach((interaction) => {

            const interactionCard =
                createAIInteractionCard(interaction);

            reportContent.appendChild(
                interactionCard
            );

        });
    }


    /*
     * Create one AI interaction card.
     */
    function createAIInteractionCard(interaction) {

        const card = document.createElement("article");

        card.className = "card ai-report-card";


        const inputText =
            interaction.input_text || "No input available.";

        const outputText =
            interaction.output_text || "No output available.";

        const createdAt =
            formatDate(interaction.created_at);

        const updatedAt =
            formatDate(interaction.updated_at);


        card.innerHTML = `

            <div class="ai-report-header">

                <h2 class="card-title">
                    AI Interaction
                </h2>

            </div>


            <div class="ai-report-input">

                <h3>
                    Input
                </h3>

                <p>
                    ${escapeHTML(inputText)}
                </p>

            </div>


            <div class="ai-report-output">

                <h3>
                    Output
                </h3>

                <p>
                    ${escapeHTML(outputText)}
                </p>

            </div>


            <div class="ai-report-dates">

                <p>
                    <strong>Created:</strong>
                    ${escapeHTML(createdAt)}
                </p>

                <p>
                    <strong>Updated:</strong>
                    ${escapeHTML(updatedAt)}
                </p>

            </div>


            <div class="ai-report-files">

                ${renderFiles(interaction.files)}

            </div>

        `;


        return card;
    }


    /*
     * Render AI support files.
     */
    function renderFiles(files) {

        if (!files || files.length === 0) {

            return `
                <p class="ai-report-no-files">
                    No attachments
                </p>
            `;
        }


        const fileItems = files.map((file) => {

            return `
                <div class="ai-report-file">

                    <strong>
                        ${escapeHTML(file.original_name)}
                    </strong>

                    <span>
                        ${escapeHTML(file.file_type)}
                    </span>

                    <span>
                        ${formatFileSize(file.file_size)}
                    </span>

                </div>
            `;

        }).join("");


        return `
            <div class="ai-report-attachments">

                <h3>
                    Attachments
                </h3>

                ${fileItems}

            </div>
        `;
    }


    /*
     * Render pagination.
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
                () => loadAIReports(data.previous)
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
                () => loadAIReports(data.next)
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
     * Format file size.
     */
    function formatFileSize(bytes) {

        if (!bytes || bytes <= 0) {
            return "0 Bytes";
        }


        const units = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];


        const index = Math.floor(
            Math.log(bytes) / Math.log(1024)
        );


        const size =
            bytes / Math.pow(1024, index);


        return `${size.toFixed(2)} ${units[index]}`;
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
    loadAIReports(
        "/reports/api/ai/"
    );

});