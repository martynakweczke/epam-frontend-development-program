const form = document.getElementById("feedback-form");
const statusBox = document.getElementById("feedback-status");

function showError(input, message) {
  const group = input.parentElement;
  const error = group.querySelector(".error-message");
  error.textContent = message;
}

function clearError(input) {
  const group = input.parentElement;
  const error = group.querySelector(".error-message");
  error.textContent = "";
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("input", (e) => {
  const input = e.target;

  if (input.required && input.value.trim() === "") {
    showError(input, "This field is required.");
  } else if (input.type === "email" && !validateEmail(input.value)) {
    showError(input, "Please enter a valid email.");
  } else {
    clearError(input);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  [...form.elements].forEach((input) => {
    if (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA") return;

    if (input.required && input.value.trim() === "") {
      showError(input, "This field is required.");
      valid = false;
    }

    if (input.type === "email" && !validateEmail(input.value)) {
      showError(input, "Please enter a valid email.");
      valid = false;
    }
  });

  if (!valid) return;

  statusBox.style.color = "green";
  statusBox.textContent = "Your message has been sent successfully!";

  form.reset();
});
