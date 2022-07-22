const form = document.querySelector("form")
const fields = ["username", "email", "password", "confirmPassword"];
const inputs = fields.map((field) => document.querySelector(`#${field}`));

form.addEventListener("submit", (event) => {
    // event.preventDefault();
    // inputs.forEach(input => validateFields(input));
    console.log(event.target);
})

inputs.forEach((input) => {
    input.addEventListener("input", () => {
        validateFields(input);
    })
})

function validateFields(input) {
    let msg;
    switch (input.id) {
        case "username":
            msg = validateUsername(input.value.trim());
            break;
        case "email":
            msg = validateEmail(input.value.trim());
            break;
        case "password":
            msg = validatePassword(input.value.trim());
            break;
        case "confirmPassword":
            const password = document.querySelector("#password").value.trim();
            msg = validateConfirmPassword(input.value.trim(), password);
        default:
            break;
    }
    if (msg === true) {
        displayValidation(input, "", "success");
    } else {
        displayValidation(input, msg, "error");
    }
}

function displayValidation(input, msg, type) {
    const successIcon = input.parentNode.querySelector(".icon-success");
    const errorIcon = input.parentNode.querySelector(".icon-error");
    const errorMsg = input.parentNode.querySelector(".error-message");

    if (type === "success") {
        successIcon.classList.remove("hidden");
        errorIcon.classList.add("hidden");
        errorMsg.textContent = "";
    } else {
        successIcon.classList.add("hidden");
        errorIcon.classList.remove("hidden");
        errorMsg.textContent = msg;
    }
}

function validateUsername(userName) {
    if (!userName) {
        return "Username required"
    }
    else return true;
};

function validatePassword(password) {
    if (!password) {
        return "Password required"
    };
    if (password.length < 8) {
        return `Password must contain at least 8 characters`
    };
    return true;
};

function validateConfirmPassword(confirmPassword, password) {
    if (!confirmPassword) {
        return "Password confirmation required";
    };
    if (confirmPassword !== password) {
        return `Password confirmation must be matched with Password `;
    };
    return true;
};

function validateEmail(email) {
    if (!email) {
        return "Email required";
    };
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        return "Email invalid";
    };
    return true;
}

