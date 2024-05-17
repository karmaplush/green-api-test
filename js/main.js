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

// TODO:
// function sendMessage(apiUrl, idInstance, apiTokenInstance) {
//     const urlTemplate = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

//     disableForm(true);

//     return fetch(urlTemplate, {
//         method: "POST",
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`Request was not successful, status code: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log("Success:", data);
//         return JSON.stringify(data, undefined, 2);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//         return error
//     })
//     .finally(() => {
//         disableForm(false);
//     });
// }


function getData(event, isSubmit) {
    event.preventDefault();

    const responseTarget = document.getElementById("target")
    responseTarget.textContent = ""

    let isValid = true

     // Just for showcase, must be unique for every user
    const apiUrl = "https://7103.api.greenapi.com"


    const idInstanceInput = document.getElementById("id-instance-input");
    const apiTokenInstanceInput = document.getElementById("api-token-instance-input");

    idInstanceInput.classList.remove("field-error")
    apiTokenInstanceInput.classList.remove("field-error")

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

    if (isSubmit) {
        switch (event.submitter.id) {
            case "get-settings-button":

                fetchSettingsData(apiUrl, idInstanceInput.value, apiTokenInstanceInput.value)
                .then((formattedData) => {
                    if (formattedData) {
                        responseTarget.textContent = formattedData;
                    }
                });
                break;

            case "send-message-button":
                console.log("send-message-button")
                break;

            case "send-file-button":
                console.log("send-file-button")
                break;

            default:
                console.log("Unknown submitter")
                break;
        }
    } else {
        switch (event.srcElement.id) {
            case "get-state-instance-button":

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
    }

}
