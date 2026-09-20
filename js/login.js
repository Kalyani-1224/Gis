const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const loginMessage = document.getElementById("loginMessage");

const togglePassword = document.getElementById("togglePassword");

/* =========================
   REGULAR EXPRESSIONS
========================= */

// Username:
// Allows letters, numbers, dot and underscore.
// Minimum 3 and maximum 30 characters.

const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

// Password:
// Allows letters, numbers and common special characters.
// Minimum 8 and maximum 30 characters.
// This allows demo password: admin123

const passwordRegex = /^[A-Za-z0-9@$!%*?&._-]{8,30}$/;

/* =========================
   PASSWORD SHOW/HIDE
========================= */

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";

    this.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

/* =========================
   MESSAGE FUNCTION
========================= */

function showMessage(message, color) {
  loginMessage.style.color = color;

  loginMessage.textContent = message;
}

/* =========================
   USERNAME VALIDATION
========================= */

function validateUsername(username) {
  if (username === "") {
    return "Username is required.";
  }

  if (username.length < 3) {
    return "Username must contain at least 3 characters.";
  }

  if (username.length > 30) {
    return "Username must not exceed 30 characters.";
  }

  if (!usernameRegex.test(username)) {
    return "Username can contain only letters, numbers, dot and underscore.";
  }

  return "";
}

/* =========================
   PASSWORD VALIDATION
========================= */

function validatePassword(password) {
  if (password === "") {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (password.length > 30) {
    return "Password must not exceed 30 characters.";
  }

  if (!passwordRegex.test(password)) {
    return "Password contains invalid characters.";
  }

  return "";
}

/* =========================
   LIVE USERNAME VALIDATION
========================= */

usernameInput.addEventListener("input", function () {
  const username = usernameInput.value.trim();

  usernameInput.classList.remove("valid-input", "invalid-input");

  if (username === "") {
    return;
  }

  const usernameError = validateUsername(username);

  if (usernameError === "") {
    usernameInput.classList.add("valid-input");
  } else {
    usernameInput.classList.add("invalid-input");
  }
});

/* =========================
   LIVE PASSWORD VALIDATION
========================= */

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;

  passwordInput.classList.remove("valid-input", "invalid-input");

  if (password === "") {
    return;
  }

  const passwordError = validatePassword(password);

  if (passwordError === "") {
    passwordInput.classList.add("valid-input");
  } else {
    passwordInput.classList.add("invalid-input");
  }
});

/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  const password = passwordInput.value.trim();

  // Validate username first
  const usernameError = validateUsername(username);

  if (usernameError !== "") {
    showMessage(usernameError, "#ff647c");

    usernameInput.focus();

    return;
  }

  // Validate password
  const passwordError = validatePassword(password);

  if (passwordError !== "") {
    showMessage(passwordError, "#ff647c");

    passwordInput.focus();

    return;
  }

  // Check login credentials
  if (username === "admin" && password === "admin123") {
    showMessage("Login successful. Opening GIS Dashboard...", "#36d399");

    /*
     * Store login status
     */

    sessionStorage.setItem("gisLoggedIn", "true");

    sessionStorage.setItem("gisUser", username);

    // Redirect to dashboard
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 700);
  } else {
    showMessage("Invalid username or password.", "#ff647c");
  }
});
