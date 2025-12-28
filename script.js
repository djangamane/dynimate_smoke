const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Neon smoke portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    alt: "Glow shelves with product lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    alt: "Neon city night scene",
  },
  {
    src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80",
    alt: "Studio neon glow portrait",
  },
];

const heroImageEl = document.querySelector("#heroImage");
const dots = Array.from(document.querySelectorAll(".dot"));
let activeIndex = 0;
let timerId;

const setActiveSlide = (index) => {
  activeIndex = index % heroImages.length;
  const { src, alt } = heroImages[activeIndex];
  heroImageEl.src = src;
  heroImageEl.alt = alt;
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === activeIndex);
  });
};

const startRotation = () => {
  timerId = setInterval(() => {
    setActiveSlide(activeIndex + 1);
  }, 5000);
};

const resetRotation = () => {
  clearInterval(timerId);
  startRotation();
};

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    if (!Number.isNaN(index)) {
      setActiveSlide(index);
      resetRotation();
    }
  });
});

setActiveSlide(0);
startRotation();
