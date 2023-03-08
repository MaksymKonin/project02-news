const dataNewsDefault = {
  id_news: Math.floor(Math.random() * 10000),
  photo_url: 'https://kyryloca.github.io/pictureholder/news-placeholder.png',
  page_url: 'https://kyryloca.github.io/pictureholder/news-placeholder.png',
  section: 'uncategorized',
  statusFavorite: 'Add to favorite',
  title: 'title',
  abstract: 'abstract',
  published_date: '1970-01-01',
};

// приводимо дані від сервера до одного виду
export default function normalaizData(data) {
  const araayData = [];
  data.forEach(element => {
    let photoEl = getPhotoNews(element);
    let publishedDataEl = getPublishedDataNews(element);
    let dataEl = {
      id_news: element?._id || element?.id || dataNewsDefault.id_news,
      photo_url: photoEl || dataNewsDefault.photo_url,
      page_url: element?.web_url || element?.url || dataNewsDefault.page_url,
      section:
        element?.section_name || element?.section || dataNewsDefault.section,
      statusFavorite: dataNewsDefault.statusFavorite,
      title: element?.headline?.main || element?.title || dataNewsDefault.title,
      abstract: element?.abstract || dataNewsDefault.abstract,
      published_date: publishedDataEl,
    };
    araayData.push(dataEl);
  });
  return araayData;
}
//отримуємо фото новин
function getPhotoNews(element) {
  let photoEl = element?.multimedia || element?.media;
  if (photoEl?.length === 0) {
    return dataNewsDefault.photo_url;
  }
  if ((photoEl = element?.media)) {
    photoEl =
      element.media[0]['media-metadata'].length === 0
        ? dataNewsDefault.photo_url
        : element.media[0]['media-metadata'][2].url;
  } else {
    photoEl = element?.multimedia[0].url.includes('https://static01.nyt.com/')
      ? element?.multimedia[0].url
      : `https://static01.nyt.com/${element?.multimedia[0].url}`;
  }
  return photoEl;
}
//отримуємо дату публікації новин і форматуємо в необхідний вид
function getPublishedDataNews(element) {
  let date = new Date(
    element?.pub_date ||
      element?.published_date ||
      dataNewsDefault.published_date
  );
  return (
    addZero(date.getDate()) +
    '/' +
    addZero(date.getMonth() + 1) +
    '/' +
    addZero(date.getFullYear())
  );
}
//добавляємо попереду 0 в даті де місяць і день менше 10
function addZero(num) {
  if (num >= 0 && num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
}

export {};
