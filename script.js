const form = document.querySelector("#waitlist-form");
const emailInput = document.querySelector("#email");
const statusEl = document.querySelector("#form-status");
const STORAGE_KEY = "orpheus_waitlist_emails";

function readEmails() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function setStatus(message, state) {
  form.classList.remove("is-error", "is-success");

  if (state) {
    form.classList.add(`is-${state}`);
  }

  statusEl.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();

  if (!emailInput.checkValidity() || !email) {
    setStatus("Enter a valid email to join the ORPHEUS waitlist.", "error");
    emailInput.focus();
    return;
  }

  const emails = readEmails();

  if (!emails.includes(email)) {
    emails.push(email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
  }

  emailInput.value = "";
  setStatus("Access request logged. Welcome to the ORPHEUS waitlist.", "success");
});
