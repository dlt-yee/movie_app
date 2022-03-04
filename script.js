const TOKEN = '677dffb1-f4c3-4c6f-a2f3-602ff1e7daf9';
const API_URL_TOP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

let previewId = Math.floor(Math.random()*10+3)

getMovies(API_URL_TOP);
getAwait(`https://kinopoiskapiunofficial.tech/api/v2.2/films/301`)


async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': TOKEN,
        },
    })
    const respData = await resp.json();
    showMovies(respData)
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = '';

    data.films.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <div class="movie-info">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie-poster">
                <p class="movie-year">${movie.year}</p>
                <p class="movie-title">${movie.nameRu}</p>
                <p class="movie-rating"><img class="movie-rating-icon" src="./src/assets/imbd-icon.png">${movie.rating}</p>
                <p class="movie-category">${movie.genres.map(genre=> `${genre.genre}`)}</p>
            </div>
        `;
        moviesEl.appendChild(movieEl);
    })
}

const logoBtn = document.querySelector('.btn-logo');
logoBtn.addEventListener('click', () => {
    getMovies(API_URL_TOP);
})

async function getAwait(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': TOKEN,
        },
    })
    const respData = await resp.json();
    showAwait(respData)
}

function showAwait(movie) {
    const previewEl = document.querySelector(".preview-block");
    const previewPosterEl = document.querySelector(".header-block")

    const previewMovieEl = document.createElement("div");
    previewMovieEl.classList.add("preview-movie");
    previewMovieEl.innerHTML = `
        <p class="preview-title">${movie.nameRu}</p>
        <p class="preview-rating"><img class="rating-icon" src="./src/assets/imbd-icon.png">${movie.ratingImdb}</p>
        <p class="preview-description">${movie.description}</p>
        <button class="btn-prev-trailer"><img class="icon" src="./src/assets/watch-icon.png" alt=""><p>WATCH TRAILER</p></button>
    `;
    previewPosterEl.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${movie.posterUrl}) no-repeat`;
    previewPosterEl.style.backgroundSize = 'cover';
    previewEl.appendChild(previewMovieEl);
}

const searchInput = document.querySelector(".search-input");
const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const search = `${API_URL_SEARCH}${searchInput.value}`;
    if (searchInput.value) {
        getMovies(search);
    }
    searchInput.value = '';
});