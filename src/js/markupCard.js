const gallery = document.querySelector(".read-card");

export default function renderCard(card) {
    console.log(gallery)
    const {
        haveRead, 
        JobSearching,
        globalCart,
        newsText,
        textUnder,
        data
    } = card

    const markupCard = `
    <div class="card-picture">
        <ul class="card-list list">
            <li class="card-item">
            <a class="have-read" href="${haveRead}">Have read</a>
            </li>
            <li class="card-item">
            <a class="job-searching" href="${JobSearching}">Job searching</a>
            </li>
            <li class="card-item">
            <button class="add-favorite" tape="button">
                Add to favorite<svg class="heart-icon" width="16" hight="16">
                <use href="./picters/symbol-defs.svg#icon-heart-empty"></use>
                </svg>
            </button>
            <div class="card-resourse">
                <img
                class="news-img"
                src="./picters/asia-bisnes.jpg"
                width="395"
                alt="news and people"
                />
                <a class="news-under-text" href="${newsText}"
                >8 tips for passing an online interview that will help you get a
                job додати</a
                >
            </div>
            <div class="card-text">
                <a class="text-under" href="${textUnder}"
                >Before you start looking for a job, it is useful to familiarize
                yourself with the job prospects offered by these dodatu tru krapku
                yksho teksty bilshe</a
                >
                <li class="card-item">
                <a class="year-month-day" href="${data}">20/02/2021</a>
                <a class="read-more" href="#">Read more</a>
                </li>
            </div>
            </li>
        </ul>
        </div>
    `
gallery.insertAdjacentHTML("beforeend", markupCard)
}

