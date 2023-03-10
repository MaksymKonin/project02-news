export default function markupCard(card) {
  const {
    id_news,
    photo_url,
    page_url,
    section,
    statusFavorite,
    title,
    abstract,
    published_date,
  } = card;
  return `
    <li data-id-news="${id_news}" class="js-card">
      <div class="use-text-tape">
        <span class="status-reed">Have read</span>
        <span class="job-text">"${section}"</span>
        <button class="status-favorite add-status add-status-js" type="button">${statusFavorite}</button>
        <button class="status-favorite remove-status remove-status-js" type="button">Remove from favorite</button>
      <div>
      <div class="card-img-wrapper">
      <img class="card-img" src="${photo_url}" alt="photo news" />
      </div>
      <a href="${page_url}" target="_blank"><h2 class="page-url">${title}</h2></a>
      <p class="abstract-text">${abstract}</p>
      <div>
        <span class="published-date">${published_date}</span>
        <a class="read-more" target="_blank" href="${page_url}">Read more</a>
      </div>
    </li>
    `;
}
