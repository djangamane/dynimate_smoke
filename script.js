const ageGate = document.getElementById("ageGate");

if (ageGate) {
  const stored = localStorage.getItem("dynamiteAgeVerified");
  const isVerified = stored === "true";
  const checkbox = document.getElementById("ageConfirm");
  const enterBtn = document.getElementById("ageEnter");
  const leaveBtn = document.getElementById("ageLeave");

  if (isVerified) {
    ageGate.classList.remove("active");
    document.body.classList.remove("no-scroll");
  } else {
    ageGate.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  if (enterBtn && checkbox) {
    enterBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        ageGate.classList.add("shake");
        checkbox.focus();
        setTimeout(() => ageGate.classList.remove("shake"), 350);
        return;
      }
      localStorage.setItem("dynamiteAgeVerified", "true");
      ageGate.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  }

  if (leaveBtn) {
    leaveBtn.addEventListener("click", () => {
      window.location.href = "https://www.google.com";
    });
  }
}

const carouselTracks = document.querySelectorAll("[data-carousel]");

carouselTracks.forEach((track) => {
  const wrapper = track.closest("[data-carousel-wrapper]");
  if (!wrapper) {
    return;
  }
  const prev = wrapper.querySelector("[data-carousel-prev]");
  const next = wrapper.querySelector("[data-carousel-next]");

  const scrollAmount = () => track.clientWidth * 0.8;

  if (prev) {
    prev.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  }
});
