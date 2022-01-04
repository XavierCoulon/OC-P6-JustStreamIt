
const category1 = "Action";
const category2 = "Comedy";
const category3 = "Drama";
const bestMovieSection = document.querySelector(".bestmovie");


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
    console.log(bestMovies["results"][0])
    return bestMovies["results"][0]
}

function displayBestMovie(){
    renderBestMovie().then(bestMovie => {
        let bestMovieImg = document.createElement("img");
        let bestMovieTitle = document.createElement("h1");
        bestMovieImg.src = bestMovie.image_url;
        bestMovieTitle.innerText = bestMovie.title;
        bestMovieSection.appendChild(bestMovieImg);
        bestMovieSection.appendChild(bestMovieTitle);
    
    let bestMovieDescription = document.createElement("h2");
    let bestMovieId = "1508669"
    renderMovieDescription(bestMovieId).then(description => bestMovieDescription.textContent = description);
    bestMovieSection.appendChild(bestMovieDescription);
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
            newCard.className = "book";
            categorySection.appendChild(newCard)
            let newImg = document.createElement("img");
            let newTitle = document.createElement("h3");
            newImg.src = bestMoviesCategory[i].image_url; 
            newTitle.innerText = bestMoviesCategory[i].title;
            newCard.appendChild(newImg);
            newCard.appendChild(newTitle);
        }
    })
}





// Data from one specific movie

async function fetchMovie(id) {
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

async function renderMovieDescription(id)  {
    const movie = await fetchMovie(id);
    //console.log(movie["description"]);
    return movie["description"];   
}


displayBestMovie()
displayBestMoviesCategory(category3)
displayBestMoviesCategory(category2)
displayBestMoviesCategory(category1)

