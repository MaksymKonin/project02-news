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
        <li data-id-news ="${id_news}" class="js-card news-item news-card-marker">
      <img src="${photo_url}" alt="photo news" />
      <span class="status-reed">Have read</span>
      <span class="status-favorite">${statusFavorite}</span>
      <a href="${page_url}"><h2>${title}</h2></a>
      <p>${abstract}</p>
      <div>
        <span class="published_date">${published_date}</span>
        <a href="${page_url}">Read more</a>
      </div>
    </li>
    `;
}
