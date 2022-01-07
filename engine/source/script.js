// DOM
const $ = document;
const root = document.querySelector(":root");

function select(query) {
    return $.querySelector(query);
}

function selectAll(query) {
    return $.querySelectorAll(query);
}

// select items 
const items = {
    header: {
        togglerCheckbox: select("#header-toggler-checkbox"),
        title: {
            login: select(".header-title-login"),
            signup: select(".header-title-signup")
        }
    },
    body: select(".body"),
    input: {
        inputs: selectAll(".input"),
        icons: selectAll(".input-icon")
    }
}

let signStatus = "login";

let loginDisplayTimeout;
const chnageSignStatus = {
    login: () => {
        clearTimeout(loginDisplayTimeout);
        signStatus = "login";
        root.style.setProperty("--body-rotate", "rotateY(0deg)");
        root.style.setProperty("--background-position", "0 0");
        root.style.setProperty("--body-height", "380px");
        root.style.setProperty("--login-display", "flex");
    },
    signup: () => {
        clearTimeout(loginDisplayTimeout);
        signStatus = "signup";
        root.style.setProperty("--body-rotate", "rotateY(180deg)");
        root.style.setProperty("--background-position", "200% 100%");
        root.style.setProperty("--body-height", "430px");
        loginDisplayTimeout = setTimeout(() => {
            if (signStatus != "login") {
                root.style.setProperty("--login-display", "none");
            }
        }, 500)
    }
}

function checkSignStatus() {
    switch (signStatus) {
        case "login":
            chnageSignStatus.signup();
            break;
        case "signup":
            chnageSignStatus.login();
            break;
    }
}

function setInputFocus(input, icon) {
    input.addEventListener("focus", () => {
        icon.classList.add("focused-icon");
        input.parentElement.classList.add("input-focused");
    })
    input.addEventListener("blur", () => {
        icon.classList.remove("focused-icon");
        input.parentElement.classList.remove("input-focused");
    });
}

for (let index in items.input.inputs) {
    if (typeof items.input.inputs[index] == "object") {
        setInputFocus(items.input.inputs[index], items.input.icons[index])
    }
}

// events
items.header.togglerCheckbox.addEventListener("change", checkSignStatus);
items.header.title.login.addEventListener("click", () => {
    chnageSignStatus.login();
    items.header.togglerCheckbox.checked = false;
});
items.header.title.signup.addEventListener("click", () => {
    chnageSignStatus.signup();
    items.header.togglerCheckbox.checked = true;
});