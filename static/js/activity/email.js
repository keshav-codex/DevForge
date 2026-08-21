document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("email-activity-form");

    if (!form) {
        return;
    }


    /* =========================================================
       RECIPIENT CONFIGURATION
    ========================================================= */

    const recipients = {
        to: {
            input: document.getElementById("email-to-input"),
            chips: document.getElementById("email-to-chips"),
        },

        cc: {
            input: document.getElementById("email-cc-input"),
            chips: document.getElementById("email-cc-chips"),
        },

        bcc: {
            input: document.getElementById("email-bcc-input"),
            chips: document.getElementById("email-bcc-chips"),
        },
    };


    /* =========================================================
       CLEAR CLIENT-SIDE ERROR
    ========================================================= */
    function clearEmailMessages() {
    document.querySelectorAll(".email-message").forEach((message) => {
        message.remove();
    });
    }

    function clearRecipientError() {

        const error = document.getElementById(
            "email-recipient-error"
        );

        if (error) {
            error.remove();
        }
    }


    /* =========================================================
       RECIPIENT CHIP
    ========================================================= */

    function addRecipient(type) {

        const input = recipients[type]?.input;
        const chips = recipients[type]?.chips;

        if (!input || !chips) {
            return;
        }

        const email = input.value.trim().toLowerCase();

        if (!email) {
            return;
        }


        const existingFields = chips.querySelectorAll(
            `input[name="${type}"]`
        );

        for (const field of existingFields) {

            if (field.value.toLowerCase() === email) {

                input.value = "";

                return;
            }
        }


        const hiddenInput = document.createElement("input");

        hiddenInput.type = "hidden";
        hiddenInput.name = type;
        hiddenInput.value = email;


        const chip = document.createElement("span");

        chip.className = "recipient-chip";


        const text = document.createElement("span");

        text.className = "recipient-chip-text";
        text.textContent = email;


        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.className = "recipient-chip-remove";

        removeButton.setAttribute(
            "aria-label",
            `Remove ${email}`
        );

        removeButton.textContent = "×";


        removeButton.addEventListener("click", () => {

            hiddenInput.remove();
            chip.remove();

        });


        chip.appendChild(text);
        chip.appendChild(removeButton);

        chips.appendChild(hiddenInput);
        chips.appendChild(chip);

        input.value = "";

        input.focus();

        clearRecipientError();
    }


    /* =========================================================
       ENTER / COMMA RECIPIENT INPUT
    ========================================================= */

    Object.keys(recipients).forEach((type) => {

        const input = recipients[type]?.input;

        if (!input) {
            return;
        }


        input.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === ","
            ) {

                event.preventDefault();

                addRecipient(type);
            }

        });


        input.addEventListener("input", () => {

            clearRecipientError();
            clearEmailMessages();

        });

    });


    /* =========================================================
       SHOW CC
    ========================================================= */

    const showCcButton =
        document.getElementById("email-show-cc");

    const ccSection =
        document.getElementById("email-cc-section");


    if (showCcButton && ccSection) {

        showCcButton.addEventListener("click", () => {

            ccSection.classList.remove(
                "recipient-hidden"
            );

            showCcButton.hidden = true;

            recipients.cc?.input?.focus();

        });

    }


    /* =========================================================
       SHOW BCC
    ========================================================= */

    const showBccButton =
        document.getElementById("email-show-bcc");

    const bccSection =
        document.getElementById("email-bcc-section");


    if (showBccButton && bccSection) {

        showBccButton.addEventListener("click", () => {

            bccSection.classList.remove(
                "recipient-hidden"
            );

            showBccButton.hidden = true;

            recipients.bcc?.input?.focus();

        });

    }


    /* =========================================================
       ATTACHMENTS
    ========================================================= */

    const attachmentInput = document.getElementById(
    "email-attachments-input"
);

const dropzone = document.getElementById(
    "email-attachment-dropzone"
);

const attachmentList = document.getElementById(
    "email-attachment-list"
);


if (attachmentInput && dropzone && attachmentList) {

    dropzone.addEventListener("click", function () {

        attachmentInput.click();

    });


    attachmentInput.addEventListener("change", function () {

        attachmentList.innerHTML = "";

        const files = attachmentInput.files;

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            const item = document.createElement("div");

            item.className = "attachment-item";


            const info = document.createElement("div");

            info.className = "attachment-info";


            const name = document.createElement("span");

            name.className = "attachment-name";

            name.textContent = file.name;


            const size = document.createElement("span");

            size.className = "attachment-size";

            size.textContent = formatFileSize(file.size);


            info.appendChild(name);

            info.appendChild(size);

            item.appendChild(info);

            attachmentList.appendChild(item);
        }

    });

    }


    function formatFileSize(bytes) {

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(
            bytes / (1024 * 1024)
        ).toFixed(1)} MB`;
    }


    function removeAttachment(index) {

        if (!attachmentInput) {
            return;
        }


        const files = Array.from(
            attachmentInput.files
        );

        files.splice(index, 1);


        const dataTransfer =
            new DataTransfer();


        files.forEach((file) => {

            dataTransfer.items.add(file);

        });


        attachmentInput.files =
            dataTransfer.files;


        attachmentInput.dispatchEvent(
            new Event("change")
        );
    }


    /* =========================================================
       AI ASSISTANT TOGGLE
    ========================================================= */

    const aiToggle =
        document.getElementById(
            "email-ai-toggle"
        );

    const aiPanel =
        document.getElementById(
            "email-ai-panel"
        );


    if (aiToggle && aiPanel) {

        aiToggle.addEventListener(
            "click",
            function () {

                aiPanel.hidden =
                    !aiPanel.hidden;


                if (!aiPanel.hidden) {

                    const instruction =
                        document.getElementById(
                            "email-ai-instruction"
                        );

                    if (instruction) {
                        instruction.focus();
                    }

                }

            }
        );

    }


    /* =========================================================
       AI ACTION BUTTONS
    ========================================================= */

    const aiActionInput =
        document.getElementById(
            "email-ai-action"
        );

    const aiInstruction =
        document.getElementById(
            "email-ai-instruction"
        );


    const aiActionButtons =
        document.querySelectorAll(
            "[data-ai-action]"
        );


    aiActionButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.aiAction;


                if (!action) {
                    return;
                }


                if (!aiActionInput) {
                    return;
                }


                /*
                    AI instruction is required.

                    Subject, body, recipients and files
                    remain optional.
                */

                if (
                    !aiInstruction ||
                    !aiInstruction.value.trim()
                ) {

                    if (aiInstruction) {
                        aiInstruction.focus();
                    }

                    return;
                }


                aiActionInput.value =
                    action;


                /*
                    Submit the same email form.

                    Django checks ai_action first,
                    so normal recipient validation
                    is not performed for AI.
                */

                form.requestSubmit();

            }

        );

    });


    /* =========================================================
       AI RESPONSE
    ========================================================= */

    const aiResponse =
        document.getElementById(
            "email-ai-response"
        );


    if (aiResponse) {

        const responseText =
            aiResponse.textContent.trim();


        if (responseText) {

            parseAIResponse(
                responseText
            );

        }

    }


    function parseAIResponse(response) {

        const subjectMatch =
            response.match(
                /SUBJECT:\s*([\s\S]*?)(?=\n\s*BODY:|$)/i
            );


        const bodyMatch =
            response.match(
                /BODY:\s*([\s\S]*)$/i
            );


        const subjectField =
            document.getElementById(
                "id_subject"
            );

        const bodyField =
            document.getElementById(
                "id_body"
            );


        if (
            subjectMatch &&
            subjectField
        ) {

            subjectField.value =
                subjectMatch[1].trim();

        }


        if (
            bodyMatch &&
            bodyField
        ) {

            bodyField.value =
                bodyMatch[1].trim();

        }

    }


    /* =========================================================
       CLEAR ERROR WHEN USER STARTS CORRECTING FORM
    ========================================================= */

    const subjectField =
        document.getElementById(
            "id_subject"
        );

    const bodyField =
        document.getElementById(
            "id_body"
        );


    if (subjectField) {
    clearRecipientError();
    clearEmailMessages();
    }



    if (bodyField) {

    bodyField.addEventListener(
        "input",
        () => {
            clearRecipientError();
            clearEmailMessages();
        }
    );

    }


    if (aiInstruction) {

        aiInstruction.addEventListener(
            "input",() => {
            clearRecipientError();
            clearEmailMessages();
        }
    );

    }


    /* =========================================================
       NORMAL SEND
    ========================================================= */

    form.addEventListener(
        "submit",
        (event) => {

            /*
                If an AI action is present,
                Django handles the request as AI.
            */

            if (aiActionInput?.value) {
                return;
            }


            const to =
                recipients.to?.chips?.querySelectorAll(
                    'input[name="to"]'
                ) || [];


            const cc =
                recipients.cc?.chips?.querySelectorAll(
                    'input[name="cc"]'
                ) || [];


            const bcc =
                recipients.bcc?.chips?.querySelectorAll(
                    'input[name="bcc"]'
                ) || [];


            const hasRecipient =
                to.length > 0 ||
                cc.length > 0 ||
                bcc.length > 0;


            /*
                If the user typed an email but did not
                press Enter/comma, convert it to a chip.
            */

            if (!hasRecipient) {

                let added = false;


                Object.keys(recipients).forEach(
                    (type) => {

                        const input =
                            recipients[type]?.input;


                        if (
                            input &&
                            input.value.trim()
                        ) {

                            addRecipient(type);

                            added = true;

                        }

                    }
                );


                if (added) {
                    return;
                }


                event.preventDefault();

                showRecipientError();

            }

        }
    );


    function showRecipientError() {

        let error =
            document.getElementById(
                "email-recipient-error"
            );


        if (!error) {

            error =
                document.createElement(
                    "div"
                );

            error.id =
                "email-recipient-error";

            error.className =
                "email-form-error";


            const firstRecipient =
                document.querySelector(
                    ".recipient-field"
                );


            if (firstRecipient) {

                firstRecipient.before(error);

            } else {

                form.prepend(error);

            }

        }


        error.textContent =
            "Please add at least one recipient.";

    }


});