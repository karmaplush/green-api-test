function disableForm(disable) {

    const idInstanceInput = document.getElementById("id-instance-input");
    const apiTokenInstanceInput = document.getElementById("api-token-instance-input");
    const getSettingsButton = document.getElementById("get-settings-button");
    const getStateInstanceButton = document.getElementById("get-state-instance-button");

    const sendMessagePhoneInput = document.getElementById("send-message-phone-input")
    const sendMessageMessageInput = document.getElementById("send-message-message-input")
    const sendMessageButtom = document.getElementById("send-message-button")

    const sendFilePhoneInput = document.getElementById("send-file-phone-input")
    const sendFileUrlInput = document.getElementById("send-file-url-input")
    const sendFileButton = document.getElementById("send-file-button")

    const responseBlock = document.getElementById("response-block")

    if (disable == true) {
        responseBlock.classList.add("loader");

        idInstanceInput.disabled = true;
        apiTokenInstanceInput.disabled = true;
        getSettingsButton.disabled = true;
        getStateInstanceButton.disabled = true;

        sendMessagePhoneInput.disabled = true;
        sendMessageMessageInput.disabled = true;
        sendMessageButtom.disabled = true;

        sendFilePhoneInput.disabled = true;
        sendFileUrlInput.disabled = true;
        sendFileButton.disabled = true;

    } else {
        responseBlock.classList.remove("loader");

        idInstanceInput.disabled = false;
        apiTokenInstanceInput.disabled = false;
        getSettingsButton.disabled = false;
        getStateInstanceButton.disabled = false;

        sendMessagePhoneInput.disabled = false;
        sendMessageMessageInput.disabled = false;
        sendMessageButtom.disabled = false;

        sendFilePhoneInput.disabled = false;
        sendFileUrlInput.disabled = false;
        sendFileButton.disabled = false;
    }
}

function resetErrorsState() {
    const idInstanceInput = document.getElementById("id-instance-input");
    const apiTokenInstanceInput = document.getElementById("api-token-instance-input");
    const sendMessagePhoneInput = document.getElementById("send-message-phone-input")
    const sendMessageMessageInput = document.getElementById("send-message-message-input")
    const sendFilePhoneInput = document.getElementById("send-file-phone-input")
    const sendFileUrlInput = document.getElementById("send-file-url-input")

    idInstanceInput.classList.remove("field-error")
    apiTokenInstanceInput.classList.remove("field-error")
    sendMessagePhoneInput.classList.remove("field-error")
    sendMessageMessageInput.classList.remove("field-error")
    sendFilePhoneInput.classList.remove("field-error")
    sendFileUrlInput.classList.remove("field-error")
}


function fetchSettingsData(apiUrl, idInstance, apiTokenInstance) {
    const urlTemplate = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;

    disableForm(true);

    return fetch(urlTemplate, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request was not successful, status code: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            return JSON.stringify(data, undefined, 2);
        })
        .catch((error) => {
            console.error("Error:", error);
            return error
        })
        .finally(() => {
            disableForm(false);
        });
}

function fetchStateInstanceData(apiUrl, idInstance, apiTokenInstance) {
    const urlTemplate = `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    disableForm(true);

    return fetch(urlTemplate, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request was not successful, status code: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            return JSON.stringify(data, undefined, 2);
        })
        .catch((error) => {
            console.error("Error:", error);
            return error
        })
        .finally(() => {
            disableForm(false);
        });
}


function sendMessage(apiUrl, idInstance, apiTokenInstance, recipient, message) {
    const urlTemplate = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    let chatId

    if (recipient.length > 11) {
        chatId = `${recipient}@g.us`
    } else {
        chatId = `${recipient}@c.us`
    }

    const formData = {
        chatId: chatId,
        message: message,
    };

    disableForm(true);

    return fetch(urlTemplate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request was not successful, status code: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            return JSON.stringify(data, undefined, 2);
        })
        .catch((error) => {
            console.error("Error:", error);
            return error
        })
        .finally(() => {
            disableForm(false);
        });
}


function sendFileByUrl(apiUrl, idInstance, apiTokenInstance, recipient, urlFile) {
    const urlTemplate = `${apiUrl}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;

    let chatId

    if (recipient.length > 11) {
        chatId = `${recipient}@g.us`
    } else {
        chatId = `${recipient}@c.us`
    }

    const urlFileParts = urlFile.split('/');
    const fileName = urlFileParts[urlFileParts.length - 1];
    const extensionRegex = /\.\w+$/;
    const hasExtension = extensionRegex.test(fileName);
    if (!hasExtension) {
        fileName = null
    }

    const formData = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName
    };

    console.log(`URL: ${urlFile}\nFile Name: ${fileName}`)

    disableForm(true);

    return fetch(urlTemplate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request was not successful, status code: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            return JSON.stringify(data, undefined, 2);
        })
        .catch((error) => {
            console.error("Error:", error);
            return error
        })
        .finally(() => {
            disableForm(false);
        });
}

function getData(event) {
    event.preventDefault();

    const responseTarget = document.getElementById("target")

    let isValid = true

    // Just for showcase, must be unique for every user
    const apiUrl = "https://7103.api.greenapi.com"

    const idInstanceInput = document.getElementById("id-instance-input");
    const apiTokenInstanceInput = document.getElementById("api-token-instance-input");

    resetErrorsState()

    if (!idInstanceInput.value.trim()) {
        idInstanceInput.classList.add("field-error")
        isValid = false
    }

    if (!apiTokenInstanceInput.value.trim()) {
        apiTokenInstanceInput.classList.add("field-error")
        isValid = false
    }

    if (!isValid) {
        return
    }

    if (event instanceof SubmitEvent) {
        switch (event.submitter.id) {

            case "get-settings-button":
                responseTarget.textContent = ""
                fetchSettingsData(apiUrl, idInstanceInput.value, apiTokenInstanceInput.value)
                    .then((formattedData) => {
                        if (formattedData) {
                            responseTarget.textContent = formattedData;
                        }
                    });
                break;

            case "send-message-button":

                const sendMessagePhoneInput = document.getElementById("send-message-phone-input")
                const sendMessageMessageInput = document.getElementById("send-message-message-input")

                if (!sendMessagePhoneInput.value.trim()) {
                    sendMessagePhoneInput.classList.add("field-error")
                    isValid = false
                }

                if (!sendMessageMessageInput.value.trim()) {
                    sendMessageMessageInput.classList.add("field-error")
                    isValid = false
                }

                if (!isValid) {
                    return
                }

                responseTarget.textContent = ""
                sendMessage(
                    apiUrl,
                    idInstanceInput.value,
                    apiTokenInstanceInput.value,
                    sendMessagePhoneInput.value,
                    sendMessageMessageInput.value,
                ).then((formattedData) => {
                    if (formattedData) {
                        responseTarget.textContent = formattedData;
                    }
                });

                break;

            case "send-file-button":

                const sendFilePhoneInput = document.getElementById("send-file-phone-input")
                const sendFileUrlInput = document.getElementById("send-file-url-input")

                if (!sendFilePhoneInput.value.trim()) {
                    sendFilePhoneInput.classList.add("field-error")
                    isValid = false
                }

                if (!sendFileUrlInput.value.trim()) {
                    sendFileUrlInput.classList.add("field-error")
                    isValid = false
                }

                if (!isValid) {
                    return
                }

                responseTarget.textContent = ""
                sendFileByUrl(
                    apiUrl,
                    idInstanceInput.value,
                    apiTokenInstanceInput.value,
                    sendFilePhoneInput.value,
                    sendFileUrlInput.value,
                ).then((formattedData) => {
                    if (formattedData) {
                        responseTarget.textContent = formattedData;
                    }
                });

                break;

            default:
                console.log("Unknown submitter")
                break;
        }
    } else if (event instanceof PointerEvent) {
        switch (event.target.id) {

            case "get-state-instance-button":
                responseTarget.textContent = ""
                fetchStateInstanceData(apiUrl, idInstanceInput.value, apiTokenInstanceInput.value)
                    .then((formattedData) => {
                        if (formattedData) {
                            responseTarget.textContent = formattedData;
                        }
                    });
                break;

            default:
                console.log("Unknown submitter")
                break;
        }
    } else {
        console.log("Unknown event type");
    }


}
