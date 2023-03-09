const mobileMenu = document.querySelector('.js-menu-container');
const bodyAnchor = document.querySelector('body');
const mobileRedirectAnchor = document.querySelector('.mobile__menu-list');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
mobileRedirectAnchor.addEventListener('click', r => {
  bodyAnchor.classList.remove('scroll-disable-state');
});
openMenuBtn.addEventListener('click', r => {
  mobileMenu.classList.remove('is-hidden');
  bodyAnchor.classList.add('scroll-disable-state');
});
closeMenuBtn.addEventListener('click', r => {
  mobileMenu.classList.add('is-hidden');
  bodyAnchor.classList.remove('scroll-disable-state');
});

// const toggleMenu = () => {
//   const isMenuOpen =
//     openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//   openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//   mobileMenu.classList.toggle('is-open');

//   const scrollLockMethod = !isMenuOpen
//     ? 'disableBodyScroll'
//     : 'enableBodyScroll';
//   bodyScrollLock[scrollLockMethod](document.body);
// };
//     // Close the mobile menu on wider screens if the device orientation changes
//     window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
//     if (!e.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     bodyScrollLock.enableBodyScroll(document.body);
//     });
