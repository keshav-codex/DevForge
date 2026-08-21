document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const form = document.getElementById(
        "ai-activity-form"
    );

    const fileInput = document.getElementById(
        "id_files"
    );

    const selectedFilesContainer =
        document.getElementById(
            "ai-selected-files"
        );

    const uploadArea =
        document.getElementById(
            "ai-upload-area"
        );

    const submitButton =
        document.getElementById(
            "ai-submit-button"
        );

    const submitText =
        document.getElementById(
            "ai-submit-text"
        );

    const submitLoading =
        document.getElementById(
            "ai-submit-loading"
        );


    /* =========================================================
       CONSTANTS
    ========================================================= */

    const MAX_FILES = 5;

    const MAX_TOTAL_SIZE =
        10 * 1024 * 1024;

    const ALLOWED_EXTENSIONS = [
        ".pdf",
        ".docx",
        ".txt"
    ];


    /* =========================================================
       SELECTED FILES
    ========================================================= */

    let selectedFiles = [];


    /* =========================================================
       FILE VALIDATION
    ========================================================= */

    function validateFiles(files) {

        if (files.length > MAX_FILES) {

            return {
                valid: false,
                message:
                    "You can upload a maximum of 5 files."
            };
        }


        let totalSize = 0;


        for (const file of files) {

            const extension =
                "." +
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            if (
                !ALLOWED_EXTENSIONS.includes(
                    extension
                )
            ) {

                return {
                    valid: false,
                    message:
                        `${file.name} is not a supported file type.`
                };
            }


            totalSize += file.size;
        }


        if (
            totalSize > MAX_TOTAL_SIZE
        ) {

            return {
                valid: false,
                message:
                    "Total file size cannot exceed 10 MB."
            };
        }


        return {
            valid: true,
            message: ""
        };
    }


    /* =========================================================
       FILE SIZE FORMAT
    ========================================================= */

    function formatFileSize(bytes) {

        if (bytes < 1024) {

            return `${bytes} B`;
        }


        if (bytes < 1024 * 1024) {

            return (
                (bytes / 1024).toFixed(1) +
                " KB"
            );
        }


        return (
            (bytes / (1024 * 1024)).toFixed(1) +
            " MB"
        );
    }


    /* =========================================================
       DISPLAY FILES
    ========================================================= */

    function renderFiles() {

        selectedFilesContainer.innerHTML =
            "";


        selectedFiles.forEach(
            function (file, index) {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "ai-file-item";


                const information =
                    document.createElement(
                        "div"
                    );

                information.className =
                    "ai-file-information";


                const name =
                    document.createElement(
                        "span"
                    );

                name.className =
                    "ai-file-name";

                name.textContent =
                    file.name;


                const size =
                    document.createElement(
                        "span"
                    );

                size.className =
                    "ai-file-size";

                size.textContent =
                    formatFileSize(
                        file.size
                    );


                information.appendChild(
                    name
                );

                information.appendChild(
                    size
                );


                const removeButton =
                    document.createElement(
                        "button"
                    );

                removeButton.type =
                    "button";

                removeButton.className =
                    "ai-file-remove";

                removeButton.textContent =
                    "×";

                removeButton.setAttribute(
                    "aria-label",
                    `Remove ${file.name}`
                );


                removeButton.addEventListener(
                    "click",
                    function () {

                        selectedFiles.splice(
                            index,
                            1
                        );

                        updateFileInput();

                        renderFiles();

                        updateUploadArea();
                    }
                );


                item.appendChild(
                    information
                );

                item.appendChild(
                    removeButton
                );


                selectedFilesContainer.appendChild(
                    item
                );
            }
        );
    }


    /* =========================================================
       UPDATE FILE INPUT
    ========================================================= */

    function updateFileInput() {

        const dataTransfer =
            new DataTransfer();


        selectedFiles.forEach(
            function (file) {

                dataTransfer.items.add(
                    file
                );
            }
        );


        fileInput.files =
            dataTransfer.files;
    }


    /* =========================================================
       UPDATE UPLOAD AREA
    ========================================================= */

    function updateUploadArea() {

        if (
            selectedFiles.length >=
            MAX_FILES
        ) {

            uploadArea.classList.add(
                "ai-upload-disabled"
            );

        } else {

            uploadArea.classList.remove(
                "ai-upload-disabled"
            );
        }
    }


    /* =========================================================
       FILE INPUT CHANGE
    ========================================================= */

    if (fileInput) {

        fileInput.addEventListener(
            "change",
            function () {

                const newFiles =
                    Array.from(
                        fileInput.files
                    );


                const combinedFiles = [
                    ...selectedFiles,
                    ...newFiles
                ];


                /*
                 * Remove duplicate files.
                 */
                const uniqueFiles = [];


                combinedFiles.forEach(
                    function (file) {

                        const duplicate =
                            uniqueFiles.some(
                                function (
                                    existingFile
                                ) {

                                    return (
                                        existingFile.name ===
                                            file.name &&
                                        existingFile.size ===
                                            file.size &&
                                        existingFile.lastModified ===
                                            file.lastModified
                                    );
                                }
                            );


                        if (!duplicate) {

                            uniqueFiles.push(
                                file
                            );
                        }
                    }
                );


                const validation =
                    validateFiles(
                        uniqueFiles
                    );


                if (!validation.valid) {

                    alert(
                        validation.message
                    );

                    updateFileInput();

                    return;
                }


                selectedFiles =
                    uniqueFiles;


                updateFileInput();

                renderFiles();

                updateUploadArea();
            }
        );
    }


    /* =========================================================
       DRAG & DROP
    ========================================================= */

    if (uploadArea) {

        uploadArea.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                uploadArea.classList.add(
                    "ai-upload-dragging"
                );
            }
        );


        uploadArea.addEventListener(
            "dragleave",
            function () {

                uploadArea.classList.remove(
                    "ai-upload-dragging"
                );
            }
        );


        uploadArea.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                uploadArea.classList.remove(
                    "ai-upload-dragging"
                );


                const droppedFiles =
                    Array.from(
                        event.dataTransfer.files
                    );


                const combinedFiles = [
                    ...selectedFiles,
                    ...droppedFiles
                ];


                const uniqueFiles = [];


                combinedFiles.forEach(
                    function (file) {

                        const duplicate =
                            uniqueFiles.some(
                                function (
                                    existingFile
                                ) {

                                    return (
                                        existingFile.name ===
                                            file.name &&
                                        existingFile.size ===
                                            file.size &&
                                        existingFile.lastModified ===
                                            file.lastModified
                                    );
                                }
                            );


                        if (!duplicate) {

                            uniqueFiles.push(
                                file
                            );
                        }
                    }
                );


                const validation =
                    validateFiles(
                        uniqueFiles
                    );


                if (!validation.valid) {

                    alert(
                        validation.message
                    );

                    return;
                }


                selectedFiles =
                    uniqueFiles;


                updateFileInput();

                renderFiles();

                updateUploadArea();
            }
        );
    }


    /* =========================================================
       FORM SUBMISSION
    ========================================================= */

    if (form) {

        form.addEventListener(
            "submit",
            function () {

                /*
                 * Final client-side validation.
                 */
                const validation =
                    validateFiles(
                        selectedFiles
                    );


                if (!validation.valid) {

                    alert(
                        validation.message
                    );

                    return;
                }


                /*
                 * Loading state.
                 */
                if (submitButton) {

                    submitButton.disabled =
                        true;
                }


                if (submitText) {

                    submitText.hidden =
                        true;
                }


                if (submitLoading) {

                    submitLoading.hidden =
                        false;
                }
            }
        );
    }


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    updateUploadArea();

});