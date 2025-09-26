/*!
@pnp-id: age-gate
purpose: Logic for 21+ modal (always on home; never elsewhere)
owner: Puff&Pastry Custom change
*/
(function () {
  // We read the flag injected by theme.liquid
  function isHome() {
    return !!(window.PNP && window.PNP.isHome);
  }

  function openGate() {
    const gate = document.getElementById("age-gate");   // HTML must use id="age-gate"
    if (!gate) return;

    gate.classList.remove("hidden");
    document.documentElement.classList.add("age-gate-open");
    document.body.classList.add("age-gate-open");

    // Buttons (HTML must use these IDs)
    const yesBtn = document.getElementById("age-yes");
    const noBtn  = document.getElementById("age-no");

    // Focus trap (simple)
    const modal = gate.querySelector(".age-gate__modal");
    const focusables = [yesBtn, noBtn].filter(Boolean);
    let focusIndex = 0;
    modal && modal.focus();

    gate.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && focusables.length) {
        e.preventDefault();
        focusIndex = (focusIndex + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
        focusables[focusIndex].focus();
      } else if (e.key === "Escape") {
        // Do nothing—user must choose
        e.preventDefault();
      }
    });

    yesBtn && yesBtn.addEventListener("click", () => {
      closeGate(); // no localStorage – always shows next time on home
    }, { once: true });

    noBtn && noBtn.addEventListener("click", () => {
      window.location.replace("https://www.google.com/"); // your chosen redirect
    }, { once: true });

    // Disable closing via backdrop click
    gate.querySelector(".age-gate__backdrop")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  function closeGate() {
    const gate = document.getElementById("age-gate");
    if (!gate) return;
    gate.classList.add("hidden");
    document.documentElement.classList.remove("age-gate-open");
    document.body.classList.remove("age-gate-open");
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (isHome()) {
      openGate();      // always show on homepage
    }
    // Do nothing on other pages
  });
})();
