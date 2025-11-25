import { refreshProductCartsBadge } from "./cart.js";

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("burger-menu-expanded");
});

const userProfileIcon = document.getElementById("user-profile-icon");
const loginDialog = document.getElementById("login-dialog");
const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const forgotPasswordBtn = document.getElementById("forgot-password");

userProfileIcon.addEventListener("click", () => {
  loginDialog.showModal();
});

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
});

loginForm.addEventListener("submit", (e) => {
  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    e.preventDefault();
    alert("Please enter a valid email address.");
  } else if (!passwordInput.value.trim()) {
    e.preventDefault();
    alert("Password is required.");
  } else {
    loginDialog.close();
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
});

forgotPasswordBtn.addEventListener("click", () => {
  alert("Redirecting to password recovery page...");
});

document.addEventListener("DOMContentLoaded", () => {
  refreshProductCartsBadge();
});
