// Theme switch
import { refs } from './refs';
export default function changeTheme() {
  refs.checkBoxEl.addEventListener('change', goDark);
  goTeal();
}
const theme = {
  light: 'light-theme',
  dark: 'dark-theme',
};

const storageKey = 'themeKey';
const toggle = document.querySelector('.theme__track');

function goDark(event) {
  if (event.target.checked) {
    refs.bodyEl.classList.remove('ligth-theme');
    refs.bodyEl.classList.add('dark-theme');
    // refs.darkTheme.classList.add('goDark');
    refs.lightTheme.classList.remove('goLight');
    toggle.classList.add('toggleDark');
    toggle.classList.remove('toggleLight');
    localStorage.setItem(storageKey, JSON.stringify(theme.dark));
  } else {
    refs.bodyEl.classList.remove('dark-theme');
    refs.bodyEl.classList.add('ligth-theme');
    // refs.darkTheme.classList.remove('goDark');
    refs.lightTheme.classList.add('goLight');
    toggle.classList.add('toggleLight');
    toggle.classList.remove('toggleDark');
    localStorage.setItem(storageKey, JSON.stringify(theme.light));
  }
}

function goTeal() {
  const saveTheme = localStorage.getItem(storageKey);
  if (!saveTheme) {
    refs.bodyEl.classList.add('ligth-theme');
    localStorage.setItem(storageKey, JSON.stringify(theme.light));
  } else {
    const parseTheme = JSON.parse(saveTheme);
    if (parseTheme === 'dark-theme') {
      refs.bodyEl.classList.add('dark-theme');
      refs.checkBoxEl.checked = true;
    }
  }
}
