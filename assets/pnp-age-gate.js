/*!
@pnp-id: age-gate
purpose: Logic for 21+ modal
owner: Alejandra
*/
(function () {
    const KEY = "pnp_age_verified_v1";
    const DAYS = 30;

    function setWithExpiry(key, value, days) {
        const now = new Date();
        const item = { value, expiry: now.getTime() + days*24*60*60*1000 };
        localStorage.setItem(key, JSON.stringify(item));
    }

    function getWithExpiry(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        try {
            const item = JSON.parse(raw);
            if (new Date().getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch { return null; }
    }

    function openGate() {
        const gate = document.getElementById("age-gate");
        if (!gate) return;

        gate.classList.remove("hidden");
        document.documentElement.classList.add("age-gate-open");
        document.body.classList.add("age-gate-open");

        // Focus control (simple trap)
        const modal = gate.querySelector(".age-gate__modal");
        const yesBtn = document.getElementById("age-yes");
        const noBtn = document.getElementById("age-no");
        const focusables = [yesBtn, noBtn];
        let focusIndex = 0;

        // Initial focus
        modal && modal.focus();

        gate.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                focusIndex = (focusIndex + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
                focusables[focusIndex].focus();
            } else if (e.key === "Escape") {
                // Do nothing—must choose
                e.preventDefault();
            }
        });

        yesBtn?.addEventListener("click", () => {
            setWithExpiry(KEY, "yes", DAYS);
            closeGate();
        });

        noBtn?.addEventListener("click", () => {
            // Redirect minors to an info page or Google (your call)
            window.location.replace("https://www.google.com/");
        });

        // Block clicking backdrop from closing
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

    function shouldShow() {
        return getWithExpiry(KEY) !== "yes";
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (shouldShow()) openGate();
    });
})();
