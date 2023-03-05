

// Theme switch
const theme = {
    light: 'light-theme',
    dark: 'dark-theme',
};

const storageKey = 'themeKey';

const checkBox = document.querySelector('.theme-switch__toggle');
const body = document.querySelector('body');

checkBox.addEventListener('change', goDark);
goTeal();

function goDark(event) {
    if (event.target.checked) {
        body.classList.remove('ligth-theme');
        body.classList.add('dark-theme');
        localStorage.setItem(storageKey, JSON.stringify(theme.dark));
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('ligth-theme');
        localStorage.setItem(storageKey, JSON.stringify(theme.light));
    }
}

function goTeal() {
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
