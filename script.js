
// Variables to change categories.
const category1 = "History";
const category2 = "Comedy";
const category3 = "Thriller";

// Value to scroll in carrousel
const scrollWidth = 202;


// Return Id of best movie ever (from OC API)
async function fetchBestMoviesId() {
    try{
        let response = await fetch("http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score");
        let data = await response.json();
        return await data.results[0].id;
    } catch (error) {
        console.error("Error when trying to fetch best movie");
    }
}

// Return data from a specific movie (Id)
async function fetchMovieDetails(id) {
    try {
        let response = await fetch(`http://localhost:8000/api/v1/titles/${id}`);
        let movie = await response.json();
        return movie;
    } catch (error) {
        console.error("Error when trying to fetch data from a specific movie");
    }
}

// Option: IMDB API - Return trailer from a specific movie (Id)
async function trailerMovie(id) {
    try {
        let response = await fetch(`https://imdb-api.com/en/API/Trailer/k_k2td4msc/tt${id}`);
        let trailer = await response.json();
        return trailer;
    } catch (error) {
        console.error("Error when trying to fetch trailer");
    }
}


// Return movies from a category (sorted by score)
async function fetchBestMoviesByCategory(category) {
    try{
        let response = await fetch(`http://localhost:8000/api/v1/titles/?&page_size=8&sort_by=-imdb_score&genre=${category}`);
        let data = await response.json();
        return await data.results;
    } catch (error) {
        console.error("Error when trying to fetch movies from a category");
    }
}


// Display information of best movie
function displayBestMovie(id){
    let bestMovieImg = document.createElement("img");
    let bestMovieTitle = document.createElement("li");
    let bestMovieDescription = document.createElement("li");
    
    fetchMovieDetails(id).then(movie => {   
        bestMovieImg.src = movie.image_url;
        bestMovieTitle.innerText = `TITRE: ${movie.title}`;
        bestMovieDescription.textContent = `DESCRIPTION: ${movie.description}`;
        document.querySelector(".container__bestmovie__media__img").appendChild(bestMovieImg);
        
        // trailerMovie(id).then(trailer => {
        //     document.getElementById("vimeo").src = trailer.linkEmbed;
        // });
        
        document.querySelector(".container__bestmovie__details").appendChild(bestMovieTitle);
        document.querySelector(".container__bestmovie__details").appendChild(bestMovieDescription);
        document.getElementById("btnInfo").addEventListener("click", function() {
            displayModal(movie.id);
        });
    });
}

// Display best movies of a category
function displayBestMoviesCategory(category, section) {
    fetchBestMoviesByCategory(category).then(results => {
        let bestMoviesCategory = results;        
        if (section != "bestmovies"){
            document.querySelector(`#${section}Title`).innerText = category;
        } 
        for (let index = 0; index < bestMoviesCategory.length - 1; index++) {
            let newCard = document.createElement("div");
            newCard.className = "movieCard";
            newCard.id = bestMoviesCategory[index].id;
            document.querySelector(`#${section}`).appendChild(newCard);
            let newImg = document.createElement("img");
            newImg.src = bestMoviesCategory[index].image_url; 
            newCard.appendChild(newImg);
            newCard.addEventListener("click", function(e) {
                e.preventDefault();
                displayModal(newCard.id);
            });
        }
    });
    scrollCarrousel(section);
}

// Display a modal including movie's information
function displayModal(id) {

    let modal = document.querySelector("#modal");
    let imgModal = document.querySelector("#container__modal__img");
    let detailsModal = document.querySelector("#container__modal__details");
    let movieImg = document.createElement("img");
    let movieTitle = document.createElement("li");
    let movieGenres = document.createElement("li");
    let movieDatePublished = document.createElement("li");
    let movieVotes = document.createElement("li");
    let movieImdbScore = document.createElement("li");
    let movieDirectors = document.createElement("li");
    let movieActors = document.createElement("li");
    let movieDuration = document.createElement("li");
    let movieCountries = document.createElement("li");
    let movieBoxOffice = document.createElement("li");
    let movieDescription = document.createElement("li");
    fetchMovieDetails(id).then(movie => {   
        movieImg.src = movie.image_url;
        movieTitle.innerText = `TITRE: ${movie.title}`;
        movieGenres.innerText = `GENRE(s): ${movie.genres}`;
        movieDatePublished.innerText = `DATE DE SORTIE: ${movie.date_published}`;
        movieVotes.innerText = `RATED: ${movie.votes}`;
        movieImdbScore.innerText = `SCORE: ${movie.imdb_score}`;
        movieDirectors.innerText = `REALISATEUR(s): ${movie.directors}`;
        movieActors.innerText = `ACTEURS: ${movie.actors}`;
        movieDuration.innerText = `DUREE: ${movie.duration}'`;
        movieCountries.innerText = `PAYS: ${movie.countries}`;
        if (!movie.worldwide_gross_income) {
            movieBoxOffice.innerText = "CA: 0$";    
        } else {
            movieBoxOffice.innerText = `CA: ${movie.worldwide_gross_income}$`;
        }
        movieDescription.innerText = `RESUME: ${movie.description}`;
    });
    imgModal.appendChild(movieImg);
    detailsModal.appendChild(movieTitle);
    detailsModal.appendChild(movieGenres);
    detailsModal.appendChild(movieVotes);
    detailsModal.appendChild(movieImdbScore);
    detailsModal.appendChild(movieDirectors);
    detailsModal.appendChild(movieActors);
    detailsModal.appendChild(movieDuration);
    detailsModal.appendChild(movieCountries);
    detailsModal.appendChild(movieBoxOffice);
    detailsModal.appendChild(movieDescription);

    modal.style.display = "flex";
    modal.style.position = "fixed";
    modal.style.verticalAlign = "middle";
    modal.addEventListener('click', function() {
        imgModal.innerHTML = "";
        detailsModal.innerHTML = "";
        modal.style.display = "none";
    });
}

// Scroll element in a category's box
function scrollCarrousel(category) {
    let x, newx;
    
    document.getElementById(`${category}BtnLeft`).onclick = function() {
        document.getElementById(`${category}`).parentNode.scrollLeft -=scrollWidth;
    };

    document.getElementById(`${category}BtnRight`).onclick = function() {
        document.getElementById(`${category}`).parentNode.scrollLeft +=scrollWidth;
    };
}


// Main

fetchBestMoviesId().then(displayBestMovie);
displayBestMoviesCategory("", "bestmovies");
displayBestMoviesCategory(category1, "category1");
displayBestMoviesCategory(category2, "category2");
displayBestMoviesCategory(category3, "category3");