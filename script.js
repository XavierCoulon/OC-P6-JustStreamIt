
const category1 = "Action";
const category2 = "Comedy";
const category3 = "Drama";
const bestMovieSection = document.querySelector(".bestmovie");
const bestMovieDetailsSection = document.querySelector(".bestmovie-details");


// Test

// fetch("http://localhost:8000/api/v1/titles/?year=2020")
// .then(response => response.json())
// .then(response => response["results"])
// .then(data => {
//     console.log(data);

//     for (i = 0; i < data.length; i++) {
//         let newTitle = document.createElement("h1");
//         let newImg = document.createElement("img");
//         newTitle.innerText = data[i].title;
//         newImg.src = data[i].image_url; 
//         liste.appendChild(newTitle);
//         liste.appendChild(newImg)
//     }
// })


// Best movie ever and the 6 next (all categories)


async function fetchBestMovies() {
    let response = await fetch("http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score");
    let bestMovies = await response.json();
    return bestMovies
}

async function renderBestMovie() {
    let bestMovies = await fetchBestMovies();
    // console.log(bestMovies["results"][0]["id"])
    return bestMovies["results"][0]["id"]
}

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
    
    renderMovieDetails(id).then(movie => {   
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


// fetch("http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score")
// .then(response => response.json())
// .then(response => response["results"][0])
// .then(bestMovie => {
//     //console.log(bestMovie);
//     let bestMovieImg = document.createElement("img");
//     let bestMovieTitle = document.createElement("h1");
//     bestMovieImg.src = bestMovie.image_url;
//     bestMovieTitle.innerText = bestMovie.title;
//     liste.appendChild(bestMovieImg);
//     liste.appendChild(bestMovieTitle);
//  })


async function fetchBestMoviesByCategory(category) {
    const response = await fetch(`http://localhost:8000/api/v1/titles/?&page_size=8&sort_by=-imdb_score&genre=${category}`);
    const bestMovies = await response.json();
    //console.log(bestMovies);
    return bestMovies
}

async function renderBestMoviesByCategory(category) {
    const movies = await fetchBestMoviesByCategory(category)
    //console.log(movies["results"]);
    return movies["results"];
}

function displayBestMoviesCategory(category) {
    renderBestMoviesByCategory(category).then(results => {
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
            newCard.className = bestMoviesCategory[i].id;
            categorySection.appendChild(newCard)
            let newImg = document.createElement("img");
            let newTitle = document.createElement("a");
            newImg.src = bestMoviesCategory[i].image_url; 
            newTitle.innerText = bestMoviesCategory[i].title;
            newTitle.href = "#";
            newTitle.addEventListener("click", function() {
                console.log(newCard.className);
                displayModal(newCard.className);
            });
            newCard.appendChild(newImg);
            newCard.appendChild(newTitle);
        }
    })
}


function displayModal(id) {

    // let movieModal = document.getElementById("movieModal");
    let closeModal = document.getElementById("closeModal");
    let dialog = document.getElementById("modal");

    let movieImg = document.createElement("img");
    renderMovieDetails(id).then(movie => {   
        movieImg.src = movie["image_url"];
    });
    document.querySelector("#modal").appendChild(movieImg);

    dialog.showModal();

    // movieModal.addEventListener("click", function() {
    //     dialog.showModal();
    // });
    closeModal.addEventListener('click', function() {
        movieImg.remove();
        dialog.close();
    });
}


// Data from one specific movie

async function fetchMovieDetails(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/${id}`, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const movie = await response.json();
        // console.log(movie)
        return movie;
    } catch (error) {
        console.error(error);
    }
}

async function renderMovieDetails(id)  {
    const movie = await fetchMovieDetails(id);
    // console.log(movie);
    return movie;   
}




// displayModal(8571428);

renderBestMovie().then (result => displayBestMovie(result))

displayBestMoviesCategory(category3)
displayBestMoviesCategory(category2)
displayBestMoviesCategory(category1)