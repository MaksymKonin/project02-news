export default function markupCard(card) {
  const {
    id_news,
    photo_url,
    page_url,
    statusFavorite,
    title,
    abstract,
    published_date,
  } = card;
  return `
    <li data-id-news ="${id_news}" class="js-card">
      <div class="button-type">
        <span class="status-reed">Have read</span>
        <span class="job-text">Job searching</span>
        <button class="status-favorite" type="button">${statusFavorite}</button>
      <div>
      <img class="card-img" src="${photo_url}" alt="photo news" />
      <a href="${page_url}"><h2 class="page-url">${title}</h2></a>
      <p class="abstract-text">${abstract}</p>
      <div>
        <span class="published-date">${published_date}</span>
        <a class="read-more" href="${page_url}">Read more</a>
      </div>
    </li>
    `;
}
