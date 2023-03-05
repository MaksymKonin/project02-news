import ls from '../localStorage';

const newsTest = [
  {
    id: 1,
    title: 'News 1 title',
    description: 'News 1 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-02T16:17:30.814Z',
  },
  {
    id: 2,
    title: 'News 2 title',
    description: 'News 2 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-01T16:17:30.814Z',
  },
  {
    id: 3,
    title: 'News 3 title',
    description: 'News 3 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-02T16:17:30.814Z',
  },
  {
    id: 4,
    title: 'News 4 title',
    description: 'News 4 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-02T16:17:30.814Z',
  },
  {
    id: 5,
    title: 'News 5 title',
    description: 'News 5 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-01T16:17:30.814Z',
  },
  {
    id: 6,
    title: 'News 6 title',
    description: 'News 6 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-03T16:17:30.814Z',
  },
  {
    id: 7,
    title: 'News 7 title',
    description: 'News 7 description',
    imgUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/230302094821-05-mv-gemini-cruise-ship-large-tease.jpg',
    createdDate: '2023-03-01T16:17:30.814Z',
    lastReadDate: '2023-03-03T16:17:30.814Z',
  },
];

const lsNewsKey = 'readNews';
ls.save(lsNewsKey, newsTest);
const readNews = ls.load(lsNewsKey);
const groupedNewsByReadDate = groupByReadDate(readNews);
renderExpansionPanel(groupedNewsByReadDate);

function renderExpansionPanel(data) {
  const readContainer = document.querySelector('#read-container');
  const dates = Object.keys(data);
  dates.forEach(val => {
    const panel = `<button class="accordion"><div class="accordion-date">${val}</div></button>
      <div class="panel">
        ${renderReadNews(data[val])}
      </div>`;
    readContainer.insertAdjacentHTML('beforeend', panel);
  });
  applyAccordion();
}

function renderReadNews(news) {
  let newsLayout = '';
  news.forEach(val => {
    newsLayout += `<p>${val.title}</p>`;
  });
  return newsLayout;
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
    const date = val.lastReadDate.split('T')[0];
    if (date in groups) {
      groups[date].push(val);
    } else {
      groups[date] = new Array(val);
    }
  });
  return groups;
}
