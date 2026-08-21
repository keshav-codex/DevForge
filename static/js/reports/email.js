document.addEventListener("DOMContentLoaded", () => {

    const reportContent = document.getElementById(
        "email-report-content"
    );

    const paginationContainer = document.getElementById(
        "email-report-pagination"
    );


    /*
     * Load email reports from the DRF API.
     */
    async function loadEmailReports(url) {

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

            renderEmailReports(data);
            renderPagination(data);


        } catch (error) {

            console.error(
                "Error loading email reports:",
                error
            );

            showError();

        }
    }


    /*
     * Show loading state.
     */
    function showLoading() {

        reportContent.innerHTML = `
            <div class="card">

                <p class="card-description">
                    Loading email reports...
                </p>

            </div>
        `;

        paginationContainer.innerHTML = "";
    }


    /*
     * Show API error.
     */
    function showError() {

        reportContent.innerHTML = `
            <div class="card">

                <h2 class="card-title">
                    Unable to load reports
                </h2>

                <p class="card-description">
                    Something went wrong while loading
                    your email reports.
                </p>

            </div>
        `;

        paginationContainer.innerHTML = "";
    }


    /*
     * Render email records.
     */
    function renderEmailReports(data) {

        reportContent.innerHTML = "";


        if (!data.results || data.results.length === 0) {

            reportContent.innerHTML = `
                <div class="card">

                    <h2 class="card-title">
                        No Email Activity
                    </h2>

                    <p class="card-description">
                        No email reports are available yet.
                    </p>

                </div>
            `;

            return;
        }


        data.results.forEach((email) => {

            const emailCard =
                createEmailCard(email);

            reportContent.appendChild(
                emailCard
            );

        });
    }


    /*
     * Create one email report card.
     */
    function createEmailCard(email) {

        const card = document.createElement("article");

        card.className = "card email-report-card";


        const recipients = formatRecipients(email.to);
        const createdAt = formatDate(email.created_at);
        const sentAt = formatDate(email.sent_at);


        card.innerHTML = `

            <div class="email-report-header">

                <h2 class="email-report-subject">
                    ${escapeHTML(email.subject || "No Subject")}
                </h2>

                <span class="email-report-status">
                    ${escapeHTML(email.status || "unknown")}
                </span>

            </div>


            <div class="email-report-details">

                <p>
                    <strong>To:</strong>
                    ${escapeHTML(recipients)}
                </p>

                ${
                    email.cc && email.cc.length
                        ? `
                            <p>
                                <strong>CC:</strong>
                                ${escapeHTML(
                                    formatRecipients(email.cc)
                                )}
                            </p>
                        `
                        : ""
                }

                ${
                    email.bcc && email.bcc.length
                        ? `
                            <p>
                                <strong>BCC:</strong>
                                ${escapeHTML(
                                    formatRecipients(email.bcc)
                                )}
                            </p>
                        `
                        : ""
                }

                <p>
                    <strong>Created:</strong>
                    ${escapeHTML(createdAt)}
                </p>

                <p>
                    <strong>Sent:</strong>
                    ${escapeHTML(sentAt)}
                </p>

            </div>


            <div class="email-report-body">

                <h3>
                    Body
                </h3>

                <div class="email-report-body-content">
                    ${
                        email.body
                            ? escapeHTML(email.body)
                            : "No body available."
                    }
                </div>

            </div>


            ${
                email.files && email.files.length
                    ? renderFiles(email.files)
                    : ""
            }

        `;


        return card;
    }

    /*
     * Render attached files.
     * The attachment section is displayed
     * only when files exist.
     */
    function renderFiles(files) {

        const fileItems = files.map((file) => {

            return `
                <div class="email-report-file">

                    <strong>
                        ${escapeHTML(
                            file.original_name || "Unnamed file"
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            file.file_type || "Unknown type"
                        )}
                    </span>

                    <span>
                        ${formatFileSize(file.file_size)}
                    </span>

                </div>
            `;

        }).join("");


        return `
            <div class="email-report-files">

                <div class="email-report-attachments">

                    <h3>
                        Attachments
                    </h3>

                    ${fileItems}

                </div>

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


        /*
         * Previous button.
         */
        if (data.previous) {

            const previousButton =
                document.createElement("button");

            previousButton.type =
                "button";

            previousButton.textContent =
                "Previous";

            previousButton.addEventListener(
                "click",
                () => loadEmailReports(
                    data.previous
                )
            );

            pagination.appendChild(
                previousButton
            );
        }


        /*
         * Next button.
         */
        if (data.next) {

            const nextButton =
                document.createElement("button");

            nextButton.type =
                "button";

            nextButton.textContent =
                "Next";

            nextButton.addEventListener(
                "click",
                () => loadEmailReports(
                    data.next
                )
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
     * Format recipients.
     */
    function formatRecipients(recipients) {

        if (!recipients) {
            return "—";
        }


        if (Array.isArray(recipients)) {

            return recipients.join(", ");
        }


        return String(recipients);
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


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        const size =
            bytes /
            Math.pow(1024, index);


        return `${size.toFixed(2)} ${units[index]}`;
    }


    /*
     * Protect the page from HTML injection
     * when displaying API data.
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
    loadEmailReports(
        "/reports/api/email/"
    );

});