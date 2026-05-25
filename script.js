const form = document.querySelector("#waitlist-form");
const emailInput = document.querySelector("#email");
const statusEl = document.querySelector("#form-status");

const SUPABASE_URL = "https://liclnxsbjjdkaxzdxmnb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uWY31EfPbX7TIi0nTxVKiA_bGI_AbCv";

function setStatus(message, state) {
  form.classList.remove("is-error", "is-success");
  if (state) form.classList.add(`is-${state}`);
  statusEl.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();

  if (!emailInput.checkValidity() || !email) {
    setStatus("Enter a valid email to join the ORPHEUS waitlist.", "error");
    emailInput.focus();
    return;
  }

  setStatus("Submitting...", null);

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/notify-waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Submission failed");

    emailInput.value = "";
    setStatus("Access request logged. Welcome to the ORPHEUS waitlist.", "success");
  } catch {
    setStatus("Something went wrong. Try again.", "error");
  }
});
