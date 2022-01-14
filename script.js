const category1 = "Action";
const category2 = "Comedy";
const category3 = "History";
const scrollWidth = 202;
const bestMovieSection = document.querySelector(".box-bestmovie");
const bestMovieDetailsSection = document.querySelector(".bestmovie-details");


// Return Id from the API's best movie
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
        let response = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {
            method: 'GET',
            credentials: 'same-origin'
        });
        let movie = await response.json();
        return movie;
    } catch (error) {
        console.error(error);
    }
}

// IMDB API - Return trailer from a specific movie (Id)
async function trailerMovie(id) {
    try {
        let response = await fetch(`https://imdb-api.com/en/API/Trailer/k_k2td4msc/tt${id}`, {
            method: 'GET',
            credentials: 'same-origin'
        });
        let trailer = await response.json();
        return trailer;
    } catch (error) {
        console.error(error);
    }
}


// Return movies from a category (sorted by score)
async function fetchBestMoviesByCategory(category) {
    let response = await fetch(`http://localhost:8000/api/v1/titles/?&page_size=8&sort_by=-imdb_score&genre=${category}`);
    let data = await response.json();
    return await data["results"];
}


// Display information of best movie
function displayBestMovie(id){
    let bestMovieImg = document.createElement("img");
    let bestMovieTitle = document.createElement("li");
    let bestMovieDescription = document.createElement("li");
    
    fetchMovieDetails(id).then(movie => {   
        bestMovieImg.src = movie["image_url"];
        bestMovieTitle.innerText = `TITRE: ${movie["title"]}`;
        bestMovieDescription.textContent = `DESCRIPTION: ${movie["description"]}`;
        document.querySelector(".bestmovie-img").appendChild(bestMovieImg);
        
        trailerMovie(id).then(trailer => {
            document.getElementById("vimeo").src = trailer["linkEmbed"];
        });
        
        bestMovieDetailsSection.insertBefore(bestMovieTitle, document.getElementById("vimeo"));
        bestMovieDetailsSection.insertBefore(bestMovieDescription, document.getElementById("vimeo"));
        document.getElementById("button-info").addEventListener("click", function() {
            displayModal(movie["id"]);
        });
    })
}

// Display best movies of a category
function displayBestMoviesCategory(category, section) {
    fetchBestMoviesByCategory(category).then(results => {
        let bestMoviesCategory = results;        
        if (section != "bestmovies"){
            document.querySelector(`#${section}_title`).innerText = category;
        } 
        for (i = 0; i < bestMoviesCategory.length - 1; i++) {
            let newCard = document.createElement("div");
            newCard.className = "movieCard";
            newCard.id = bestMoviesCategory[i].id;
            document.querySelector(`#${section}`).appendChild(newCard)
            let newImg = document.createElement("img");
            newImg.src = bestMoviesCategory[i].image_url; 
            newCard.appendChild(newImg);
            newCard.addEventListener("click", function(e) {
                e.preventDefault();
                displayModal(newCard.id);
            });
        }
    })
    scrollCarrousel(section);
}

function displayModal(id) {

    let modal = document.getElementById("container-modal");
    let imgModal = document.querySelector(".modal-img");
    let detailsModal = document.querySelector(".modal-details");
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
        movieImg.src = movie["image_url"];
        movieTitle.innerText = movie["title"];
        movieGenres.innerText = movie["genres"];
        movieDatePublished.innerText = movie["date_published"];
        movieVotes.innerText = movie["votes"];
        movieImdbScore.innerText = movie["imdb_score"];
        movieDirectors.innerText = movie["directors"];
        movieActors.innerText = movie["actors"];
        movieDuration.innerText = movie["duration"];
        movieCountries.innerText = movie["countries"];
        movieBoxOffice.innerText = movie["worldwide_gross_income"];
        movieDescription.innerText = movie["description"];
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
    document.getElementById(`button-${category}-left`).onclick = function() {
        document.getElementById(`box-${category}`).scrollLeft -= scrollWidth;
    }
    
    document.getElementById(`button-${category}-right`).onclick = function() {
        document.getElementById(`box-${category}`).scrollLeft += scrollWidth;
    }
}


// Main

fetchBestMoviesId().then (id => displayBestMovie(id));




displayBestMoviesCategory("", "bestmovies");
displayBestMoviesCategory(category1, "category1");
displayBestMoviesCategory(category2, "category2");
displayBestMoviesCategory(category3, "category3");