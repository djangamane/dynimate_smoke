const ageGate = document.getElementById("ageGate");
const introOverlay = document.getElementById("introVideoOverlay");
const introVideo = document.getElementById("introVideo");
const introLoading = document.getElementById("introVideoLoading");
const introSkipBtn = document.getElementById("introSkipBtn");

function showIntroVideo() {
  if (!introOverlay || !introVideo) {
    document.body.classList.remove("no-scroll");
    return;
  }

  introOverlay.classList.add("active");

  // Fetch video as blob for better performance with large files
  fetch("https://zsng9zue1usfdu9u.public.blob.vercel-storage.com/SMOKE%20SHOP%20VIDEO.mp4")
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      introVideo.src = blobUrl;
      introVideo.load();

      introVideo.addEventListener("canplay", function onCanPlay() {
        introVideo.removeEventListener("canplay", onCanPlay);
        if (introLoading) introLoading.classList.add("hidden");
        introVideo.play();

        // Show skip button after 2 seconds
        setTimeout(() => {
          if (introSkipBtn) introSkipBtn.classList.add("visible");
        }, 2000);
      });

      introVideo.addEventListener("ended", closeIntroVideo);

      // Revoke blob URL when done to free memory
      introVideo.addEventListener("ended", () => URL.revokeObjectURL(blobUrl), { once: true });
    })
    .catch(() => {
      // Fallback: if fetch fails, just close the intro
      closeIntroVideo();
    });
}

function closeIntroVideo() {
  if (introOverlay) introOverlay.classList.remove("active");
  if (introVideo) introVideo.pause();
  document.body.classList.remove("no-scroll");
}

if (introSkipBtn) {
  introSkipBtn.addEventListener("click", closeIntroVideo);
}

if (ageGate) {
  const stored = localStorage.getItem("dynamiteAgeVerified");
  const introSeen = sessionStorage.getItem("dynamiteIntroSeen");
  const isVerified = stored === "true";
  const checkbox = document.getElementById("ageConfirm");
  const enterBtn = document.getElementById("ageEnter");
  const leaveBtn = document.getElementById("ageLeave");

  if (isVerified) {
    ageGate.classList.remove("active");
    // Show intro video once per session if not already seen
    if (!introSeen && introOverlay) {
      showIntroVideo();
      sessionStorage.setItem("dynamiteIntroSeen", "true");
    } else {
      document.body.classList.remove("no-scroll");
    }
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
      sessionStorage.setItem("dynamiteIntroSeen", "true");
      ageGate.classList.remove("active");
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
