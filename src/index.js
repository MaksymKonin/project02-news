import createCalendar from './js/renderCalendar';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';

createCalendar();

//run default weather
weatherMarkup();
//run weather according to location
userPositionConsent();




















// Theme switch
const theme = {
    light: 'light-theme',
    dark: 'dark-theme',
};

const storageKey = 'themeKey';

const checkBox = document.querySelector('.theme-switch__toggle');
const body = document.querySelector('body');

checkBox.addEventListener('change', onChange);
isTheme();

function onChange(ev) {
    if (ev.target.checked) {
        body.classList.remove('ligth-theme');
        body.classList.add('dark-theme');
        localStorage.setItem(storageKey, JSON.stringify(theme.dark));
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('ligth-theme');
        localStorage.setItem(storageKey, JSON.stringify(theme.light));
    }
}

function isTheme() {
    const saveTheme = localStorage.getItem(storageKey);
    if (!saveTheme) {
        body.classList.add('ligth-theme');
        localStorage.setItem(storageKey, JSON.stringify(theme.light));
    } else {
        const parseTheme = JSON.parse(saveTheme);
        if (parseTheme === 'dark-theme') {
            body.classList.add('dark-theme');
            checkBox.checked = true;
        }
    }
}

