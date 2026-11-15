// ⋆˙⟡ small touches ⟡˙⋆

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Lights-out intro (F1 start procedure): 5 lights on, pause, all out.
const lights = document.getElementById('lights');
if (lights) {
  const dots = lights.querySelectorAll('.light');
  dots.forEach((d, i) => setTimeout(() => d.classList.add('on'), 350 + i * 420));
  const hold = 350 + dots.length * 420 + 600 + Math.random() * 900;
  setTimeout(() => {
    lights.classList.add('out');
    const go = document.getElementById('go');
    if (go) go.classList.add('show');
  }, hold);
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Scroll-driven car on the NAZCA card
const car = document.getElementById('car');
if (car) {
  const track = car.parentElement;
  const update = () => {
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress 0 → 1 as the track travels from bottom to ~30% of the viewport
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
    const max = track.clientWidth - car.clientWidth - 24;
    car.style.transform = `translateX(${p * max}px)`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
