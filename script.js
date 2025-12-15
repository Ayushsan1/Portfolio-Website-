const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav a');
const yearEl = document.getElementById('year');

function setYear() {
  const y = new Date().getFullYear();
  if (yearEl) yearEl.textContent = y;
}

function closeNav() {
  nav.classList.remove('open');
}

function toggleNav() {
  nav.classList.toggle('open');
}

function smoothScroll(event) {
  const href = event.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  event.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const offsetTop = window.pageYOffset + rect.top - 56;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  closeNav();
}

function updateActiveLink() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const scrollPos = window.scrollY + 120;
  let currentId = '';
  for (const s of sections) {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = s.id;
      break;
    }
  }
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    const id = href.replace('#', '');
    if (id === currentId) a.classList.add('active');
    else a.classList.remove('active');
  });
}

setYear();
if (toggle) toggle.addEventListener('click', toggleNav);
links.forEach(a => a.addEventListener('click', smoothScroll));
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('resize', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);
