// Hamburger
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navMenu.classList.remove("open")),
  );

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 90);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Carousel
const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const items = track.querySelectorAll(".carousel-item");
let current = 0;
const visibleCount = () =>
  window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;

function buildDots() {
  dotsContainer.innerHTML = "";
  const total = Math.ceil(items.length / visibleCount());
  for (let i = 0; i < total; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === current ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(d);
  }
}

function goTo(index) {
  const vc = visibleCount();
  const maxIndex = Math.ceil(items.length / vc) - 1;
  current = Math.min(index, maxIndex);
  const itemW = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${current * vc * (itemW + 16)}px)`;
  dotsContainer
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === current));
}

buildDots();
window.addEventListener("resize", () => {
  current = 0;
  buildDots();
  goTo(0);
});
setInterval(() => {
  const total = Math.ceil(items.length / visibleCount());
  goTo((current + 1) % total);
}, 4200);

// Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const n = document.getElementById("nome").value.trim();
  const em = document.getElementById("email").value.trim();
  const m = document.getElementById("mensagem").value.trim();
  if (!n || !em || !m) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  const msg = document.getElementById("form-msg");
  msg.style.display = "block";
  this.reset();
  setTimeout(() => (msg.style.display = "none"), 4500);
});