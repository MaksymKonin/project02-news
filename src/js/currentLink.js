const links = document.querySelectorAll('.navigation-list__link');

export default function setNewActiveLink() {
  const links = document.querySelectorAll('.navigation-list__link');
  links.forEach(link => {
    if (link.classList.contains('navigation-list__link--current'))
      link.classList.remove('navigation-list__link--current');
    let currentHref = window.location.href;
    if (currentHref.includes(link.getAttribute('href')))
      link.classList.add('navigation-list__link--current');
  });
}
