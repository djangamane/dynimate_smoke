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
  const items = Array.from(track.children);
  if (!items.length) {
    return;
  }

  let index = 0;

  const getStep = () => {
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    return itemWidth + gap;
  };

  const update = () => {
    const step = getStep();
    const visibleCount = Math.max(1, Math.floor(wrapper.clientWidth / step));
    const maxIndex = Math.max(0, items.length - visibleCount);
    index = Math.min(Math.max(index, 0), maxIndex);
    track.style.transform = `translateX(${-index * step}px)`;
  };

  if (prev) {
    prev.addEventListener("click", () => {
      index -= 1;
      update();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      index += 1;
      update();
    });
  }

  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  update();
});
