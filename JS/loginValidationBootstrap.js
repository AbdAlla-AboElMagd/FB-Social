 /********************************* Start Documentation ****************************************
* @File      : loginValidate.js
* @Author    : AbdAlla AboElMagd
* @Brief     : That is The Login Validate JS File For the  Page of a Page Like Facebook (For Learning Purpose Only)
*********************************** End Documentation ****************************************/ 
import { showingAlert } from "./handleAlert.js";
const loginForm = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");
const btnRegister = document.getElementById("btnRegister");

/*************** Handling Register Button ****************** */
btnRegister.onclick = () => {
  window.location.href = "./register.html";
};
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
/************* Email Validation *****************/

const email = document.querySelector("#email");

function emailValidation() {
  const email = document.querySelector("#email");
  let checkPattern =
    /(^([a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu))$)|(^\d{11}$)/i;
  let emailValue = email.value;
  let emailParent = email.parentNode;
  if (checkPattern.test(emailValue)) {
    console.log("Accepted Email");
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    emailParent.classList.remove("is-invalid");
    emailParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Email");
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    emailParent.classList.remove("is-valid");
    emailParent.classList.add("is-invalid");
  }
}

email.onchange = function () {
  emailValidation();
};

email.onkeyup = function () {
  emailValidation();
};

/*************** Passwod Validation ******************/
const pass = document.querySelector("#pass");

function validatePass() {
  const pass = document.querySelector("#pass");
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
  validatePass();
};
pass.onkeyup = function () {
  validatePass();
};

/******************************************/
function validateLoginForm() {
  let email = document.querySelector("#email");
  let pass = document.querySelector("#pass");
  let emailCheckPattern =
    /(^([a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu))$)|(^\d{11}$)/i;
  if (!emailCheckPattern.test(email.value) || pass.value.length < 6) {
    console.log("Can't Submit");
    showingAlert(1, "Error: ", "Invalid Formats");
    return false;
  } else {
    console.log("Submit");
    let savedEmailObjTxt = localStorage.getItem(email.value.toLowerCase());
    if (
      !savedEmailObjTxt ||
      savedEmailObjTxt == null ||
      savedEmailObjTxt == "null" ||
      savedEmailObjTxt == ""
    ) {
      showingAlert(1, "Error: ", "Invalid Email");
      return false;
    } else {
      let savedObject = JSON.parse(savedEmailObjTxt);
      if (savedObject.password == pass.value) {
        //showingAlert(4, "Success: ", "Login Success");
        localStorage.setItem("loggedinUser", savedEmailObjTxt);
        return true;
      } else {
        showingAlert(1, "Error: ", "Invalid Password");
        return false;
      }
    }
    // showingAlert(1, "Error: ", "Invalid Credential");
    // return false;
  }
}

let count = 0;
loginForm.onsubmit = function (e) {
  e.preventDefault();
  if (count < 3) {
    count++;
    if (validateLoginForm()) {
      showingAlert(4, "Success: ", "Login Success");
      console.log("Heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey");
      window.location.href = "../index.html";
    } else {
      showingAlert(1, "Error: ", "Invalid Credential");
    }
  } else {
    showingAlert(1, "Error: ", "Max Attempts Reached Wait 10Secs");
    submitBtn.disabled = true;
    setTimeout(function () {
      submitBtn.disabled = false;
      count = 0;
    }, 10000);
  }
};
