const category1 = "Action";
const category2 = "Comedy";
const category3 = "History";
const bestMovieSection = document.querySelector(".bestmovie");
const bestMovieDetailsSection = document.querySelector(".bestmovie-details");


// Return Id from the API's best movie
async function fetchBestMoviesId() {
    try{
        let response = await fetch("http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score");
        let data = await response.json();
        return await data["results"][0]["id"];
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
    let bestMovieGenres = document.createElement("li");
    let bestMovieDatePublished = document.createElement("li");
    let bestMovieVotes = document.createElement("li");
    let bestMovieImdbScore = document.createElement("li");
    let bestMovieDirectors = document.createElement("li");
    let bestMovieActors = document.createElement("li");
    let bestMovieDuration = document.createElement("li");
    
    fetchMovieDetails(id).then(movie => {   
        bestMovieImg.src = movie["image_url"];
        bestMovieTitle.innerText = `TITRE: ${movie["title"]}`;
        bestMovieTitle.innerText += "TEST";
        bestMovieDescription.textContent = movie["description"];
        bestMovieGenres.textContent = movie["genres"];
        bestMovieDatePublished.textContent = movie["date_published"];
        bestMovieVotes.textContent = movie["votes"];
        bestMovieImdbScore.textContent = movie["imdb_score"];
        bestMovieDirectors.textContent = movie["directors"];
        bestMovieActors.textContent = movie["actors"];
        bestMovieDuration.textContent = movie["duration"];
        
        document.querySelector(".bestmovie-img").appendChild(bestMovieImg);
        bestMovieDetailsSection.appendChild(bestMovieTitle);
        bestMovieDetailsSection.appendChild(bestMovieDescription);
        bestMovieDetailsSection.appendChild(bestMovieGenres);
        bestMovieDetailsSection.appendChild(bestMovieDatePublished);
        bestMovieDetailsSection.appendChild(bestMovieVotes);
        bestMovieDetailsSection.appendChild(bestMovieImdbScore);
        bestMovieDetailsSection.appendChild(bestMovieDirectors);
        bestMovieDetailsSection.appendChild(bestMovieActors);
        bestMovieDetailsSection.appendChild(bestMovieDuration);
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
            let newTitle = document.createElement("a");
            newImg.src = bestMoviesCategory[i].image_url; 
            newTitle.innerText = bestMoviesCategory[i].title;
            newTitle.href = "#";
            newTitle.addEventListener("click", function(e) {
                e.preventDefault();
                displayModal(newCard.id);
            });
            newCard.appendChild(newImg);
            newCard.appendChild(newTitle);
        }
    })
}

function displayModal(id) {

    let modal = document.getElementById("modal");
    let imgModal = document.querySelector(".modal-img");
    let detailsModal = document.querySelector(".modal-details");
    let movieImg = document.createElement("img");
    let movieTitle = document.createElement("li");
    fetchMovieDetails(id).then(movie => {   
        movieImg.src = movie["image_url"];
        movieTitle.innerText = movie["title"];
    });
    imgModal.appendChild(movieImg);
    detailsModal.appendChild(movieTitle);
    modal.style.display = "flex";
    modal.style.position = "fixed";
    modal.style.verticalAlign = "middle";
    modal.addEventListener('click', function() {
        imgModal.innerHTML = "";
        detailsModal.innerHTML = "";
        modal.style.display = "none";
    });
}



// Main

fetchBestMoviesId().then (id => displayBestMovie(id));
displayBestMoviesCategory("", "bestmovies");


document.getElementById("left").onclick = function() {
    document.getElementById("container").scrollLeft += 200;
}

document.getElementById("right").onclick = function() {
    document.getElementById("container").scrollLeft -= 200;
}


// displayBestMoviesCategory(category1, "category1");
// displayBestMoviesCategory(category2, "category2");
// displayBestMoviesCategory(category3, "category3");