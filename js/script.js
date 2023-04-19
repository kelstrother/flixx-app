//~ ///////////////////////////
//!   CREATING A ROUTER     //
//~ ///////////////////////////
const global = {
  currentPage: window.location.pathname,
};

//~ ///////////////////////////
//!   DISPLAYING POPULAR MOVIES     //
//~ ///////////////////////////
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
            <i class="fas fa-star text-primary"></i> 
              <small class="text-muted">${
                movie.vote_average.toFixed(1)
              }</small>
                </p>
          </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}
//~ ///////////////////////////
//!   DISPLAYING POPULAR TV SHOWS     //
//~ ///////////////////////////
async function displayPopularShows() {
  const { results } = await fetchAPIData("trending/tv/day");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                  class="card-img-top"
                  alt="${show.name}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
            }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                  <p><small>
                  <i class="fas fa-star text-primary"></i> 
                  ${show.vote_average.toFixed(1)}
                  </small>
                  </p>
            </div>
            `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

//~ ///////////////////////////
//!   DISPLAYING MOVIE DETAILS     //
//~ ///////////////////////////
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);

  //~ OVERLAY FOR BACKGROUND IMAGE
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} min</li>
            <li><span class="text-secondary">Status:</span>${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<p>${company.name}</p>`).join('')}</div>
        </div>`;

        document.querySelector('#movie-details').appendChild(div);
  
}

//~ ///////////////////////////
//!   DISPLAYING SHOW DETAILS     //
//~ ///////////////////////////
async function displayShowDetails() {
  const showID = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showID}`);

  //~ OVERLAY FOR BACKGROUND IMAGE
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              show.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                  class="card-img-top"
                  alt="${show.name}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
          ${show.networks
            .map(
              (network) =>
                `<li><span class="text-secondary">Streaming Platform:</span> ${network.name}</li>`
            )
            .join("")}
            <li><span class="text-secondary">Seasons:</span> ${
              show.number_of_seasons
            }</li>
            <li><span class="text-secondary">Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Next Episode Release:</span> ${show.next_episode_to_air.air_date}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<p>${company.name}</p>`)
            .join("")}</div>
        </div>`;

  document.querySelector("#show-details").appendChild(div);
}
//? DISPLAY BACKDROP ON DETAILS PAGES
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.15";

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv)
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

//? FETCH DATA FROM TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "8103b0d834c98dad40a89daa11894775";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&region=US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

//? FUNCTION TO SHOW LOADING SPINNER
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

//? FUNCTION TO HIDE LOADING SPINNER
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//? HIGHLIGHT ACTIVE LINK
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//?   FUNCTION TO ADD COMMAS
function addCommasToNumber(number) {
  //~ REGEX FORMULA TO ADD COMMA AFTER EVERY 3 NUMBERS
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//? INIT APP
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails()
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);
