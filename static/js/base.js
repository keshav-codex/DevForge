document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       COMMON BASE JAVASCRIPT
       ========================================================= */

    // Common JavaScript can be added here later.
    // Keep this file shared across the complete application.


    /* =========================================================
       EMAIL ACTIVITY
       ========================================================= */

    const emailPage =
        document.getElementById("email-activity-page");

    // Stop if this is not the Email Activity page.
    if (!emailPage) {
        return;
    }


    /* =========================================================
       RECIPIENT MANAGEMENT
       ========================================================= */

    const recipientConfig = {
        to: {
            input: "email-to-input",
            chips: "email-to-chips",
        },

        cc: {
            input: "email-cc-input",
            chips: "email-cc-chips",
        },

        bcc: {
            input: "email-bcc-input",
            chips: "email-bcc-chips",
        },
    };


    // Store recipients separately.
    const recipients = {
        to: [],
        cc: [],
        bcc: [],
    };


    /*
     * Add a recipient when the user presses Enter,
     * comma or Tab.
     */
    function addRecipient(type, value) {

        const email = value.trim().toLowerCase();

        if (!email) {
            return;
        }


        // Basic email validation.
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }


        // Prevent duplicates across To, Cc and Bcc.
        const alreadyExists =
            Object.values(recipients)
                .some(list => list.includes(email));

        if (alreadyExists) {

            alert("This email address has already been added.");

            return;
        }


        // Add recipient.
        recipients[type].push(email);

        // Refresh the recipient chips.
        renderRecipients(type);
    }


    /*
     * Remove a recipient.
     */
    function removeRecipient(type, index) {

        recipients[type].splice(index, 1);

        renderRecipients(type);
    }


    /*
     * Display recipient chips.
     */
    function renderRecipients(type) {

        const config =
            recipientConfig[type];

        const chipsContainer =
            document.getElementById(config.chips);

        const input =
            document.getElementById(config.input);


        chipsContainer.innerHTML = "";


        recipients[type].forEach(function (email, index) {

            const chip =
                document.createElement("span");

            chip.className = "recipient-chip";


            const emailText =
                document.createElement("span");

            emailText.textContent = email;


            const removeButton =
                document.createElement("button");

            removeButton.type = "button";
            removeButton.textContent = "×";
            removeButton.setAttribute(
                "aria-label",
                `Remove ${email}`
            );


            removeButton.addEventListener(
                "click",
                function () {

                    removeRecipient(
                        type,
                        index
                    );
                }
            );


            chip.appendChild(emailText);
            chip.appendChild(removeButton);

            chipsContainer.appendChild(chip);
        });


        // Keep the input available after chips.
        chipsContainer.parentElement.appendChild(input);

        input.value = "";
        input.focus();
    }


    /*
     * Enable recipient input behaviour.
     */
    Object.keys(recipientConfig).forEach(function (type) {

        const input =
            document.getElementById(
                recipientConfig[type].input
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Enter, comma and Tab create a recipient.
                 */
                if (
                    event.key === "Enter" ||
                    event.key === "," ||
                    event.key === "Tab"
                ) {

                    const value =
                        input.value.trim();

                    if (value) {

                        event.preventDefault();

                        addRecipient(
                            type,
                            value
                        );
                    }
                }
            }
        );
    });


    /* =========================================================
       CC / BCC VISIBILITY
       ========================================================= */

    const showCcButton =
        document.getElementById("email-show-cc");

    const showBccButton =
        document.getElementById("email-show-bcc");

    const ccSection =
        document.getElementById("email-cc-section");

    const bccSection =
        document.getElementById("email-bcc-section");


    if (showCcButton) {

        showCcButton.addEventListener(
            "click",
            function () {

                ccSection.classList.remove(
                    "recipient-hidden"
                );

                showCcButton.style.display = "none";
            }
        );
    }


    if (showBccButton) {

        showBccButton.addEventListener(
            "click",
            function () {

                bccSection.classList.remove(
                    "recipient-hidden"
                );

                showBccButton.style.display = "none";
            }
        );
    }


    /* =========================================================
       ATTACHMENTS
       ========================================================= */

    const attachmentInput =
        document.getElementById("email-attachments");

    const attachmentList =
        document.getElementById(
            "email-attachment-list"
        );


    const MAX_FILES = 5;

    const MAX_TOTAL_SIZE =
        10 * 1024 * 1024;


    const ALLOWED_EXTENSIONS = [
        ".pdf",
        ".doc",
        ".docx",
        ".txt",
    ];


    // Files selected by the user.
    let selectedFiles = [];


    /*
     * Validate newly selected files.
     */
    function validateAttachments(files) {

        // Check maximum file count.
        if (
            selectedFiles.length + files.length >
            MAX_FILES
        ) {

            alert(
                "You can upload a maximum of 5 files."
            );

            return false;
        }


        // Check every file.
        for (const file of files) {

            const extension =
                "." +
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            // Check file type.
            if (
                !ALLOWED_EXTENSIONS.includes(
                    extension
                )
            ) {

                alert(
                    `${file.name} is not supported. ` +
                    "Only PDF, DOC, DOCX and TXT files are allowed."
                );

                return false;
            }


            // Prevent duplicate files.
            const duplicate =
                selectedFiles.some(function (existingFile) {

                    return (
                        existingFile.name === file.name &&
                        existingFile.size === file.size
                    );
                });


            if (duplicate) {

                alert(
                    `${file.name} has already been added.`
                );

                return false;
            }
        }


        // Calculate total size.
        const totalSize =
            selectedFiles.reduce(
                (total, file) =>
                    total + file.size,
                0
            ) +
            files.reduce(
                (total, file) =>
                    total + file.size,
                0
            );


        // Check 10 MB limit.
        if (totalSize > MAX_TOTAL_SIZE) {

            alert(
                "The total attachment size cannot exceed 10 MB."
            );

            return false;
        }


        return true;
    }


    /*
     * Add selected files.
     */
    function addAttachments(files) {

        const fileArray =
            Array.from(files);


        if (!validateAttachments(fileArray)) {
            return;
        }


        selectedFiles.push(
            ...fileArray
        );


        renderAttachments();


        // Clear input so the same file can
        // be selected again later.
        attachmentInput.value = "";
    }


    /*
     * Remove an attachment.
     */
    function removeAttachment(index) {

        selectedFiles.splice(
            index,
            1
        );

        renderAttachments();
    }


    /*
     * Display selected attachments.
     */
    function renderAttachments() {

        attachmentList.innerHTML = "";


        selectedFiles.forEach(
            function (file, index) {

                const item =
                    document.createElement("div");

                item.className =
                    "attachment-item";


                const info =
                    document.createElement("div");

                info.className =
                    "attachment-info";


                const name =
                    document.createElement("span");

                name.className =
                    "attachment-name";

                name.textContent =
                    file.name;


                const size =
                    document.createElement("span");

                size.className =
                    "attachment-size";

                size.textContent =
                    formatFileSize(file.size);


                const removeButton =
                    document.createElement("button");

                removeButton.type = "button";

                removeButton.className =
                    "attachment-remove";

                removeButton.textContent =
                    "×";


                removeButton.addEventListener(
                    "click",
                    function () {

                        removeAttachment(index);
                    }
                );


                info.appendChild(name);
                info.appendChild(size);

                item.appendChild(info);
                item.appendChild(removeButton);

                attachmentList.appendChild(item);
            }
        );
    }


    /*
     * Convert bytes into a readable size.
     */
    function formatFileSize(bytes) {

        if (bytes < 1024) {
            return `${bytes} B`;
        }


        if (bytes < 1024 * 1024) {

            return (
                `${(bytes / 1024).toFixed(1)} KB`
            );
        }


        return (
            `${(bytes / (1024 * 1024)).toFixed(1)} MB`
        );
    }


    /*
     * Handle file selection.
     */
    if (attachmentInput) {

        attachmentInput.addEventListener(
            "change",
            function () {

                addAttachments(
                    attachmentInput.files
                );
            }
        );
    }


    /* =========================================================
       FORM SUBMISSION
       ========================================================= */

    const emailForm =
        document.getElementById(
            "email-activity-form"
        );


    if (emailForm) {

        emailForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * To / Cc / Bcc are stored as chips,
                 * so create hidden inputs before submission.
                 */
                Object.keys(recipients).forEach(
                    function (type) {

                        recipients[type].forEach(
                            function (email) {

                                const input =
                                    document.createElement(
                                        "input"
                                    );

                                input.type = "hidden";

                                input.name = type;

                                input.value = email;

                                emailForm.appendChild(
                                    input
                                );
                            }
                        );
                    }
                );


                /*
                 * Rebuild the file input using DataTransfer
                 * because the user may have removed files.
                 */
                if (attachmentInput) {

                    const dataTransfer =
                        new DataTransfer();


                    selectedFiles.forEach(
                        function (file) {

                            dataTransfer.items.add(
                                file
                            );
                        }
                    );


                    attachmentInput.files =
                        dataTransfer.files;
                }
            }
        );
    }

});