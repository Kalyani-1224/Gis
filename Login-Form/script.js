// =========================================
// GET HTML ELEMENTS
// =========================================

const registrationForm = document.getElementById("registrationForm");

const fullNameInput = document.getElementById("fullName");

const emailInput = document.getElementById("email");

const mobileInput = document.getElementById("mobile");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirmPassword");

const addressInput = document.getElementById("address");

const successMessage = document.getElementById("successMessage");

const toastContainer = document.getElementById("toastContainer");

// =========================================
// TOAST ALERT FUNCTION
// =========================================

function showToast(message, type = "error") {
  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  const icon = type === "success" ? "✓" : "!";

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// =========================================
// REGULAR EXPRESSIONS
// =========================================

// Name:
// Minimum 3 characters
// Letters and spaces only

const nameRegex = /^[A-Za-z][A-Za-z ]{2,}$/;

// Email:
// Requires username
// @
// domain
// dot
// extension

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mobile:
// Exactly 10 digits

const mobileRegex = /^[0-9]{10}$/;

// Password:
// Minimum 8 characters
// One uppercase
// One lowercase
// One number
// One special character

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// =========================================
// ERROR MESSAGE FUNCTION
// =========================================

function setError(input, errorId, message) {
  const errorElement = document.getElementById(errorId);

  input.classList.remove("valid");

  input.classList.add("invalid");

  errorElement.textContent = message;
}

// =========================================
// SUCCESS / VALID INPUT FUNCTION
// =========================================

function setValid(input, errorId) {
  const errorElement = document.getElementById(errorId);

  input.classList.remove("invalid");

  input.classList.add("valid");

  errorElement.textContent = "";
}

// =========================================
// CLEAR VALIDATION
// =========================================

function clearValidation() {
  const inputs = [
    fullNameInput,

    emailInput,

    mobileInput,

    passwordInput,

    confirmPasswordInput,

    addressInput,
  ];

  const errorIds = [
    "nameError",

    "emailError",

    "mobileError",

    "passwordError",

    "confirmPasswordError",

    "addressError",
  ];

  inputs.forEach((input) => {
    input.classList.remove("valid", "invalid");
  });

  errorIds.forEach((id) => {
    document.getElementById(id).textContent = "";
  });
}

// =========================================
// FULL NAME VALIDATION
// =========================================

function validateName() {
  const name = fullNameInput.value.trim();

  // Empty check

  if (name === "") {
    setError(fullNameInput, "nameError", "Please enter your full name");

    showToast("Please enter your full name");

    return false;
  }

  // Minimum 3 characters

  if (name.length < 3) {
    setError(
      fullNameInput,
      "nameError",
      "Name must contain at least 3 characters",
    );

    showToast("Full name must contain at least 3 characters");

    return false;
  }

  // Letters and spaces only

  if (!nameRegex.test(name)) {
    setError(
      fullNameInput,
      "nameError",
      "Name should contain letters and spaces only",
    );

    showToast("Name should contain letters and spaces only");

    return false;
  }

  setValid(fullNameInput, "nameError");

  return true;
}

// =========================================
// EMAIL VALIDATION
// =========================================

function validateEmail() {
  const email = emailInput.value.trim();

  // Empty email
  if (email === "") {
    setError(emailInput, "emailError", "Please enter your email");

    showToast("Please enter your email");

    return false;
  }

  // @ is missing
  if (!email.includes("@")) {
    setError(emailInput, "emailError", "Email must contain @");

    showToast("Email must contain @");

    return false;
  }

  // Email name before @ is missing
  if (email.startsWith("@") || email.split("@")[0].trim() === "") {
    setError(emailInput, "emailError", "Please enter the email name before @");

    showToast("Please enter the email name before @");

    return false;
  }

  // More than one @
  if ((email.match(/@/g) || []).length !== 1) {
    setError(emailInput, "emailError", "Email must contain only one @");

    showToast("Email must contain only one @");

    return false;
  }

  // Dot is missing
  if (!email.includes(".")) {
    setError(
      emailInput,
      "emailError",
      "Email must contain a dot like .com or .in",
    );

    showToast("Email must contain a dot like .com or .in");

    return false;
  }

  // Dot immediately after @
  if (email.includes("@.") || email.endsWith(".")) {
    setError(emailInput, "emailError", "Please enter a valid email domain");

    showToast("Please enter a valid email domain");

    return false;
  }

  // Complete email format
  if (!emailRegex.test(email)) {
    setError(emailInput, "emailError", "Please enter a valid email address");

    showToast("Please enter a valid email address");

    return false;
  }

  // Valid email
  setValid(emailInput, "emailError");

  return true;
}

// =========================================
// MOBILE VALIDATION
// =========================================

function validateMobile() {
  const mobile = mobileInput.value.trim();

  if (mobile === "") {
    setError(mobileInput, "mobileError", "Please enter your mobile number");

    showToast("Please enter your mobile number");

    return false;
  }

  if (!mobileRegex.test(mobile)) {
    setError(
      mobileInput,
      "mobileError",
      "Mobile number must contain exactly 10 digits",
    );

    showToast("Mobile number must contain exactly 10 digits");

    return false;
  }

  setValid(mobileInput, "mobileError");

  return true;
}

// =========================================
// PASSWORD VALIDATION
// =========================================

function validatePassword() {
  const password = passwordInput.value;

  if (password === "") {
    setError(passwordInput, "passwordError", "Please enter your password");

    showToast("Please enter your password");

    return false;
  }

  if (!passwordRegex.test(password)) {
    setError(
      passwordInput,
      "passwordError",
      "Password must be 8+ characters with uppercase, lowercase, number and special character",
    );

    showToast(
      "Password needs 8+ characters, uppercase, lowercase, number and special character",
    );

    return false;
  }

  setValid(passwordInput, "passwordError");

  return true;
}

// =========================================
// CONFIRM PASSWORD VALIDATION
// =========================================

function validateConfirmPassword() {
  const password = passwordInput.value;

  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword === "") {
    setError(
      confirmPasswordInput,
      "confirmPasswordError",
      "Please confirm your password",
    );

    showToast("Please confirm your password");

    return false;
  }

  if (password !== confirmPassword) {
    setError(
      confirmPasswordInput,
      "confirmPasswordError",
      "Passwords do not match",
    );

    showToast("Passwords do not match");

    return false;
  }

  setValid(confirmPasswordInput, "confirmPasswordError");

  return true;
}

// =========================================
// ADDRESS VALIDATION
// =========================================

function validateAddress() {
  const address = addressInput.value.trim();

  if (address === "") {
    setError(addressInput, "addressError", "Please enter your address");

    showToast("Please enter your address");

    return false;
  }

  if (address.length < 10) {
    setError(
      addressInput,
      "addressError",
      "Address must contain at least 10 characters",
    );

    showToast("Address must contain at least 10 characters");

    return false;
  }

  setValid(addressInput, "addressError");

  return true;
}

// =========================================
// FORM SUBMISSION
// =========================================

registrationForm.addEventListener("submit", function (event) {
  // Prevent page refresh

  event.preventDefault();

  // Clear previous success message

  successMessage.textContent = "";

  // Validate all fields

  const isNameValid = validateName();

  const isEmailValid = validateEmail();

  const isMobileValid = validateMobile();

  const isPasswordValid = validatePassword();

  const isConfirmPasswordValid = validateConfirmPassword();

  const isAddressValid = validateAddress();

  // Check all validations

  if (
    isNameValid &&
    isEmailValid &&
    isMobileValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isAddressValid
  ) {
    successMessage.textContent = "Registration successful!";

    showToast("Registration successful!", "success");

    // Reset form

    registrationForm.reset();

    // Clear validation styles

    clearValidation();
  }
});

// =========================================
// PASSWORD SHOW / HIDE
// =========================================

function togglePasswordVisibility(input, button) {
  if (input.type === "password") {
    input.type = "text";

    button.textContent = "Hide";

    button.setAttribute("aria-label", "Hide password");
  } else {
    input.type = "password";

    button.textContent = "Show";

    button.setAttribute("aria-label", "Show password");
  }
}

// =========================================
// PASSWORD TOGGLE
// =========================================

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, this);
  });

// =========================================
// CONFIRM PASSWORD TOGGLE
// =========================================

document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    togglePasswordVisibility(confirmPasswordInput, this);
  });

// =========================================
// MOBILE INPUT - DIGITS ONLY
// =========================================

mobileInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// =========================================
// LIVE VALIDATION ON BLUR
// =========================================

fullNameInput.addEventListener("blur", validateName);

emailInput.addEventListener("blur", validateEmail);

mobileInput.addEventListener("blur", validateMobile);

passwordInput.addEventListener("blur", validatePassword);

confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

addressInput.addEventListener("blur", validateAddress);

// =========================================
// REVALIDATE CONFIRM PASSWORD
// =========================================

passwordInput.addEventListener("input", function () {
  if (confirmPasswordInput.value !== "") {
    validateConfirmPassword();
  }
});
