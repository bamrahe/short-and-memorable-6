const partyDate = new Date("2026-11-05T17:00:00+08:00");
const countdown = document.querySelector("[data-countdown]");

const themeToggle = document.querySelector("[data-theme-toggle]");
const savedTheme = localStorage.getItem("birthday-invitation-theme");

if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

if (themeToggle) {
  const updateThemeToggle = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  };

  updateThemeToggle();
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("birthday-invitation-theme", isDark ? "dark" : "light");
    updateThemeToggle();
  });
}

if (countdown) {
  const units = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]'),
  };

  const updateCountdown = () => {
    const remaining = Math.max(0, partyDate.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    units.days.textContent = String(Math.floor(totalSeconds / 86400));
    units.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
    units.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    units.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");

    if (remaining === 0) {
      countdown.setAttribute("aria-label", "The celebration is happening now");
      countdown.previousElementSibling.textContent = "The celebration is here!";
    }
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

const openButton = document.querySelector("[data-open-invitation]");
const invitationCover = document.querySelector(".invitation-cover");
const invitationDetails = document.querySelector(".invitation-details");
const giftToggle = document.querySelector("[data-gift-toggle]");
const giftHint = document.querySelector("[data-gift-hint]");
const giftBurst = document.querySelector("[data-gift-burst]");
let giftBurstTimeout;
let openingInvitation = false;

const setGiftOpen = (isOpen) => {
  if (!giftToggle || !invitationCover) return;

  giftToggle.setAttribute("aria-expanded", String(isOpen));
  giftToggle.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} the birthday present`);
  invitationCover.classList.toggle("is-gift-open", isOpen);

  if (giftHint) {
    giftHint.textContent = isOpen ? "Tap to close" : "Tap to open";
  }

  if (isOpen && giftBurst) {
    window.clearTimeout(giftBurstTimeout);
    giftBurst.classList.remove("is-bursting");
    void giftBurst.offsetWidth;
    giftBurst.classList.add("is-bursting");
    giftBurstTimeout = window.setTimeout(() => {
      giftBurst.classList.remove("is-bursting");
    }, 1100);
  }
};

if (giftToggle) {
  giftToggle.addEventListener("click", () => {
    setGiftOpen(giftToggle.getAttribute("aria-expanded") !== "true");
  });
}

if (openButton && invitationCover && invitationDetails) {
  openButton.addEventListener("click", () => {
    if (openingInvitation) return;
    openingInvitation = true;
    openButton.disabled = true;
    setGiftOpen(true);

    window.setTimeout(() => {
      invitationCover.hidden = true;
      invitationDetails.hidden = false;
      invitationDetails.focus();
    }, 600);
  });
}

const rsvpForm = document.querySelector("[data-rsvp-form]");
const RSVP_EMAIL = "bamrahe@gmail.com";
const RSVP_WHATSAPP = "6287762607099";

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!rsvpForm.reportValidity()) return;

    const formData = new FormData(rsvpForm);
    const name = String(formData.get("name")).trim();
    const attendance = String(formData.get("attendance"));
    const guests = String(formData.get("guests"));
    const note = String(formData.get("note") || "").trim();
    const method = String(formData.get("method"));
    const subject = encodeURIComponent(`Birthday RSVP from ${name}`);
    const message = [
      "Birthday RSVP — November 5, 5:00 PM WITA",
      `Name: ${name}`,
      `Attendance: ${attendance}`,
      `Number of guests: ${guests}`,
      note ? `Note: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const body = encodeURIComponent(message);

    const status = document.querySelector("[data-form-status]");
    if (method === "whatsapp") {
      window.open(`https://wa.me/${RSVP_WHATSAPP}?text=${body}`, "_blank", "noopener,noreferrer");
      if (status) {
        status.textContent = "WhatsApp should open with your RSVP ready. Tap Send in WhatsApp to confirm.";
      }
    } else {
      if (status) {
        status.textContent = "Your email app should open with your RSVP ready. Tap Send in your email app to confirm.";
      }
      window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
    }
  });
}