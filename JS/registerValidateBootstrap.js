/********************************* Start Documentation ****************************************
 * @File      : index.html
 * @Author    : AbdAlla AboElMagd
 * @Brief     : This is The Register Validate JS File For register.html Page of a Page Like Facebook (For Learning Purpose Only)
 *********************************** End Documentation ****************************************/
import { showingAlert } from "./handleAlert.js";

/*************** Handling Login User ************************/
function isloggedIn() {
  if (
    localStorage.getItem("loggedinUser") == null ||
    localStorage.getItem("loggedinUser") == "null" ||
    localStorage.getItem("loggedinUser") == undefined ||
    localStorage.getItem("loggedinUser") == "" ||
    localStorage.getItem("loggedinUser") == " "
  ) {
    return false;
  } else {
    console.log("Logged In:", localStorage.getItem("loggedinUser"));
    return true;
  }
}

function controlLogin() {
  if (isloggedIn()) {
    window.location.href = "../index.html";
  } else {
    // Do Nothing
  }
}

window.onload = function () {
  controlLogin();
};

/************************************************************/

const firstName = document.getElementById("firstName");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const pass = document.getElementById("pass");

const birthDay = document.getElementById("birthDay");
const birthMonth = document.getElementById("birthMonth");
const birthYear = document.getElementById("birthYear");

const custom = document.getElementById("custom");

const customGenderDiv = document.getElementById("customGenderDiv");

const gender = document.getElementsByName("gender");

const register = document.getElementById("register");

/***********************************************/
function removeAllOptions(select) {
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
}
/************* Name Validation *****************/
firstName.onkeydown = function (event) {
  if (Number(event.key) || event.key == "0") {
    event.preventDefault();
  }
};
surname.onkeydown = function (event) {
  if (Number(event.key) || event.key == "0") {
    event.preventDefault();
  }
};

function validateName(nameTag) {
  let checkPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  let userNameValue = nameTag.value;
  let userNameParent = nameTag.parentNode;
  if (checkPattern.test(userNameValue)) {
    console.log("Accepted Name");
    nameTag.classList.remove("is-invalid");
    nameTag.classList.add("is-valid");
    userNameParent.classList.remove("is-invalid");
    userNameParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Name");
    nameTag.classList.remove("is-valid");
    nameTag.classList.add("is-invalid");
    userNameParent.classList.remove("is-valid");
    userNameParent.classList.add("is-invalid");
  }
}

firstName.onchange = function () {
  validateName(firstName);
};

firstName.onkeyup = function () {
  validateName(firstName);
};

surname.onchange = function () {
  validateName(surname);
};

surname.onkeyup = function () {
  validateName(surname);
};

/************* Email Validation *****************/
function emailValidation(emailTag) {
  let checkPattern =
    /(^([a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu))$)|(^\d{11}$)/i;
  let emailValue = emailTag.value;
  let emailParent = emailTag.parentNode;
  if (checkPattern.test(emailValue)) {
    console.log("Accepted Email");
    emailTag.classList.remove("is-invalid");
    emailTag.classList.add("is-valid");
    emailParent.classList.remove("is-invalid");
    emailParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Email");
    emailTag.classList.remove("is-valid");
    emailTag.classList.add("is-invalid");
    emailParent.classList.remove("is-valid");
    emailParent.classList.add("is-invalid");
  }
}

email.onchange = function () {
  emailValidation(email);
};

email.onkeyup = function () {
  emailValidation(email);
};

/*************** Passwod Validation ******************/
function validatePass(pass) {
  let passValue = pass.value;
  let passParent = pass.parentNode;
  if (passValue.length >= 6) {
    console.log("Accepted Password");
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
    passParent.classList.remove("is-invalid");
    passParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Password");
    pass.classList.remove("is-valid");
    pass.classList.add("is-invalid");
    passParent.classList.remove("is-valid");
    passParent.classList.add("is-invalid");
  }
}

pass.onchange = function () {
  validatePass(pass);
};
pass.onkeyup = function () {
  validatePass(pass);
};

/******************************************/
function setDaySelect(daySelect) {
  let date = new Date();
  removeAllOptions(daySelect);
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }
  daySelect.value = date.getDate();
}

setDaySelect(birthDay);
/******************************************/
function getMonthString(monthNumber) {
  switch (monthNumber) {
    case 1:
      return "Jan";
      break;
    case 2:
      return "Feb";
      break;
    case 3:
      return "Mar";
      break;
    case 4:
      return "Apr";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "Jun";
      break;
    case 7:
      return "Jul";
      break;
    case 8:
      return "Aug";
      break;
    case 9:
      return "Sep";
      break;
    case 10:
      return "Oct";
      break;
    case 11:
      return "Nov";
      break;
    case 12:
      return "Dec";
      break;
    default:
      return "Unknown";
      break;
  }
}
function setMonthSelect(monthSelect) {
  let date = new Date();
  removeAllOptions(monthSelect);
  for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = getMonthString(i);
    monthSelect.appendChild(option);
  }
  monthSelect.value = date.getMonth() + 1;
}

setMonthSelect(birthMonth);

/***********************************************/
function setYearSelect(yearSelect) {
  removeAllOptions(yearSelect);
  let date = new Date();
  let currentYear = date.getFullYear();
  for (let i = currentYear; i >= currentYear - 120; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear;
}

setYearSelect(birthYear);

/************************************************/
function setGender() {
  if (custom.checked) {
    customGenderDiv.setAttribute("class", "d-block");
  } else {
    customGenderDiv.setAttribute("class", "d-none");
  }
}

for (let g of gender) {
  g.addEventListener("change", setGender);
}

/*************************************************/
/*************** Handling Submit *****************/
/**************** Register validation */
function registerFormValidation() {
  let objSave = {};

  const registerForm = document.forms["register"];
  let nameCheckPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  let emailCheckPattern =
    /(^([a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu))$)|(^\d{11}$)/i;
  // const firstName = document.getElementById("firstName");
  // let surname = document.querySelector("#surname");
  // let email = document.querySelector("#email");
  // let pass = document.querySelector("#pass");
  let gender = registerForm.elements["gender"];
  let birthDay = document.getElementById("birthDay");
  let birthMonth = document.getElementById("birthMonth");
  let birthYear = document.getElementById("birthYear");
  let genderOptional = document.getElementById("genderOptional");
  let pronoun = document.getElementById("pronoun");
  if (
    !nameCheckPattern.test(firstName.value) ||
    !nameCheckPattern.test(surname.value) ||
    !emailCheckPattern.test(email.value) ||
    pass.value.length < 6 ||
    !gender.value
  ) {
    console.log("Can't Submit");
    showingAlert(1, "Error: ", "Invalid Formats");
    return false;
  } else {
    objSave["email"] = email.value.toLowerCase();
    objSave["password"] = pass.value;
    objSave["firstName"] = firstName.value;
    objSave["surname"] = surname.value;
    objSave["birthDay"] = birthDay.value;
    objSave["birthMonth"] = birthMonth.value;
    objSave["birthYear"] = birthYear.value;
    objSave["gender"] = gender.value;

    if (gender.value == "custom") {
      if (!pronoun.value) {
        console.log("Can't Submit");
        showingAlert(1, "Error: ", "Invalid Formats");
        return false;
      } else {
        objSave["pronoun"] = pronoun.value;
        objSave["GenderOptional"] = genderOptional.value;
        localStorage.setItem(
          email.value.toLowerCase(),
          JSON.stringify(objSave)
        );
        showingAlert(4, "Success: ", "Saved Authentecation to LocalStorage");
        console.log("Submit");
        return true;
      }
    }

    localStorage.setItem(email.value.toLowerCase(), JSON.stringify(objSave));
    showingAlert(4, "Success: ", "Saved Authentecation to LocalStorage");
    console.log("Submit");
    return true;
  }
}

register.onsubmit = function (e) {
  e.preventDefault();

  if (registerFormValidation()) {
    window.location.href = "../index.html";
  }
};
