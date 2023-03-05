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

function goDark(event) {
  if (event.target.checked) {
    refs.bodyEl.classList.remove('ligth-theme');
    refs.bodyEl.classList.add('dark-theme');
    localStorage.setItem(storageKey, JSON.stringify(theme.dark));
  } else {
    refs.bodyEl.classList.remove('dark-theme');
    refs.bodyEl.classList.add('ligth-theme');
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
