const ageGate = document.getElementById("ageGate");
const introOverlay = document.getElementById("introVideoOverlay");
const introVideo = document.getElementById("introVideo");
const introLoading = document.getElementById("introVideoLoading");
const introSkipBtn = document.getElementById("introSkipBtn");

// Flow: Age Consent → Intro Video → Main Site

function showIntroVideo() {
  if (!introOverlay || !introVideo) {
    document.body.classList.remove("no-scroll");
    return;
  }

  introOverlay.classList.add("active");
  document.body.classList.add("no-scroll");

  // Set video source directly - let browser stream it
  introVideo.muted = true; // Required for autoplay
  introVideo.src = "https://zsng9zue1usfdu9u.public.blob.vercel-storage.com/SMOKE%20SHOP%20VIDEO.mp4";
  introVideo.load();

  // Show skip button immediately so users aren't stuck
  if (introSkipBtn) introSkipBtn.classList.add("visible");

  introVideo.addEventListener("canplay", function onCanPlay() {
    introVideo.removeEventListener("canplay", onCanPlay);
    if (introLoading) introLoading.classList.add("hidden");
    introVideo.play().catch(() => {
      // Autoplay blocked - just close intro
      closeIntroVideo();
    });
  });

  introVideo.addEventListener("ended", closeIntroVideo);

  // Fallback: if video doesn't load within 30 seconds, move on
  setTimeout(() => {
    if (introOverlay.classList.contains("active") && introVideo.readyState < 3) {
      closeIntroVideo();
    }
  }, 30000);

  introVideo.addEventListener("error", closeIntroVideo);
}

function closeIntroVideo() {
  if (introOverlay) introOverlay.classList.remove("active");
  if (introVideo) introVideo.pause();
  sessionStorage.setItem("dynamiteIntroSeen", "true");
  document.body.classList.remove("no-scroll");
}

if (introSkipBtn) {
  introSkipBtn.addEventListener("click", closeIntroVideo);
}

// On page load
if (ageGate) {
  const stored = localStorage.getItem("dynamiteAgeVerified");
  const introSeen = sessionStorage.getItem("dynamiteIntroSeen");
  const isVerified = stored === "true";
  const checkbox = document.getElementById("ageConfirm");
  const enterBtn = document.getElementById("ageEnter");
  const leaveBtn = document.getElementById("ageLeave");

  if (isVerified) {
    // Already verified age
    ageGate.classList.remove("active");
    if (!introSeen && introOverlay) {
      // Show intro video once per session
      showIntroVideo();
    } else {
      document.body.classList.remove("no-scroll");
    }
  } else {
    // Need age verification
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
      // Show intro video after age verification
      showIntroVideo();
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
