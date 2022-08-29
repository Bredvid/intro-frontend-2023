const formElement = document.getElementById("form");
const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const alertElement = document.getElementById("alert-email");
const buttonElement = document.getElementById("form-button");

function valueExists(value) {
  return !!value;
}

formElement.addEventListener("change", function (event) {
  event.preventDefault();
});

emailElement.addEventListener("blur", function (event) {
  if (!valueExists(this.value)) {
    return (alertElement.innerText = "Påkrevd");
  }
  alertElement.innerText = "";
});

formElement.addEventListener("keyup", function (event) {
  event.preventDefault();
  buttonElement.setAttribute(
    "aria-disabled",
    valueExists(nameElement.value) && valueExists(emailElement.value)
      ? "false"
      : "true"
  );
});
buttonElement.addEventListener("click", function (event) {
  event.preventDefault();
});
