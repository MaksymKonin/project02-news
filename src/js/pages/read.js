import LocalStorageService from '../localStorage';
import setNewActiveLink from '../currentLink';
import changeTheme from '../changeTheme';
import { createCardNotFound } from '../renderNews';
import markupCard from '../markupCard';

const localStorageService = new LocalStorageService();
setNewActiveLink();
changeTheme();

const lsNewsKey = 'have-read-id';
const readNews = localStorageService.load(lsNewsKey);
if (readNews && readNews.length > 1) {
  const groupedNewsByReadDate = groupByReadDate(readNews);
  renderExpansionPanel(groupedNewsByReadDate);
} else {
  createCardNotFound();
}

function renderExpansionPanel(data) {
  const readContainer = document.querySelector('#read-container');
  const dates = Object.keys(data);
  dates.forEach(val => {
    const panel = `<button class="accordion"><div class="accordion-date">${val}</div></button>
      <div class="panel">
       <ul class="news-container">
       ${renderReadNews(data[val])}</ul>
      </div>`;
    readContainer.insertAdjacentHTML('beforeend', panel);
  });
  applyAccordion();
}

function renderReadNews(news) {
  let cards = news
    .map(Data => {
      return markupCard(Data);
    })
    .join('');
  return cards;
}

function applyAccordion() {
  const acc = document.getElementsByClassName('accordion');
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
}

function groupByReadDate(data) {
  const groups = {};

  data.forEach(val => {
    const date = new Date(val.date)
      .toISOString()
      .split('T')[0]
      .split('-')
      .join('/');
    if (date in groups) {
      groups[date].push(val);
    } else {
      groups[date] = new Array(val);
    }
  });
  return groups;
}
