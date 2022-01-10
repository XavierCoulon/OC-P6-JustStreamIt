
const category1 = "Action";
const category2 = "Comedy";
const category3 = "Drama";
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
        const response = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const movie = await response.json();
        return movie;
    } catch (error) {
        console.error(error);
    }
}

// Return movies from a category (sorted by score)
async function fetchBestMoviesByCategory(category) {
    const response = await fetch(`http://localhost:8000/api/v1/titles/?&page_size=8&sort_by=-imdb_score&genre=${category}`);
    const data = await response.json();
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
        bestMovieTitle.innerText = movie["title"];
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

// Display movies from 3 categories
function displayBestMoviesCategory(category) {
    fetchBestMoviesByCategory(category).then(results => {
        let bestMoviesCategory = results;
        let categoryTitle = document.createElement("div");
        categoryTitle.className = "category_title";
        document.body.appendChild(categoryTitle);
        let title = document.createElement("h1");
        title.innerText = category;
        categoryTitle.appendChild(title);
        let categorySection = document.createElement("div");
        categorySection.className = "category";
        document.body.appendChild(categorySection);
        for (i = 0; i < bestMoviesCategory.length - 1; i++) {
            let newCard = document.createElement("div");
            newCard.className = "movieCard";
            newCard.id = bestMoviesCategory[i].id;
            categorySection.appendChild(newCard)
            let newImg = document.createElement("img");
            let newTitle = document.createElement("a");
            newImg.src = bestMoviesCategory[i].image_url; 
            newTitle.innerText = bestMoviesCategory[i].title;
            newTitle.href = "#";
            newTitle.addEventListener("click", function() {
                displayModal(newCard.id);
            });
            newCard.appendChild(newImg);
            newCard.appendChild(newTitle);
        }
    })
}

// Modal window
function displayModal(id) {

    let closeModal = document.getElementById("closeModal");
    let dialog = document.getElementById("modal");
    let movieImg = document.createElement("img");
    fetchMovieDetails(id).then(movie => {   
        movieImg.src = movie["image_url"];
    });
    document.querySelector("#modal").appendChild(movieImg);
    dialog.showModal();
    closeModal.addEventListener('click', function() {
        movieImg.remove();
        dialog.close();
    });
}

// Main

fetchBestMoviesId().then (id => displayBestMovie(id));
displayBestMoviesCategory(category3)
displayBestMoviesCategory(category2)
displayBestMoviesCategory(category1)