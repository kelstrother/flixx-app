//~ ///////////////////////////
//!   CREATING A ROUTER     //
//~ ///////////////////////////
const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "8103b0d834c98dad40a89daa11894775",
    apiUrl: "https://api.themoviedb.org/3/",
  },
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
              <small class="text-muted">${movie.vote_average.toFixed(1)}</small>
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
  const movieID = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieID}`);

  //~ OVERLAY FOR BACKGROUND IMAGE
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
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
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } min</li>
            <li><span class="text-secondary">Status:</span>${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<p>${company.name}</p>`)
            .join("")}</div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
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
             <li><span class="text-secondary">Next Episode Release:</span> ${
               show.next_episode_to_air
             }</li>
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
  const overlayDiv = document.createElement("div");
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

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}
//~ ////////////////////////////
//!   SEARCH MOVIES/TV SHOWS  //
//~ ////////////////////////////
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    //~ TODO - make request & display results
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }
    displaySearchResults(results);

    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search");
  }
}
//~ ///////////////////////////
//!   DISPLAY SEARCH RESULTS  //
//~ //////////////////////////
function displaySearchResults(results) {
  //? CLEAR PREVIOUS RESULTS
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                  class="card-img-top"
                  alt="${
                    global.search.type === "movie" ? result.title : result.name
                  }"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${
                    global.search.type === "movie" ? result.title : result.name
                  }"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
            <i class="fas fa-star text-primary"></i> 
              <small class="text-muted">${result.vote_average.toFixed(
                1
              )}</small>
                </p>
          </div>
    `;
    document.querySelector("#search-results-heading").innerHTML = `
                <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
    `;
    document.querySelector("#search-results").appendChild(div);
  });
  displayPagination();
}
//~ ////////////////////////////////////////////
//!   CREATE & DISPLAY PAGINATION FOR SEARCH  //
//~ ////////////////////////////////////////////
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class='page-counter'>Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector("#pagination").appendChild(div);

  //? DISABLE PREV BUTTON IF ON FIRST PAGE
  if(global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }
  
  //? DISABLE NEXT BUTTON IF ON LAST PAGE
  if(global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }
  
  //? NEXT PAGE
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  })
  //? PREVIOUS PAGE
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  })

}

//~ ////////////////////////////
//!   DISPLAY SLIDER MOVIES  //
//~ ////////////////////////////
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
         `;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoPlay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
//~ ////////////////////////////
//!  FETCH DATA FROM TMDB API  //
//~ ////////////////////////////
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&region=US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

//~ ////////////////////////////
//!  MAKE REQUEST TO SEARCH  //
//~ ////////////////////////////
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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
//? SHOW ALERT
function showAlert(message, className = "error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

//?   FUNCTION TO ADD COMMAS
function addCommasToNumber(number) {
  //~ REGEX FORMULA TO ADD COMMA AFTER EVERY 3 NUMBERS
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//? INIT APP
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      displaySlider();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);
