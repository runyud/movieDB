//const addMovieModal = document.querySelector('#add-modal')
//const addMovieModal = document.body.children[1]
const addMovieModal = document.getElementById("add-modal");

// const startAddMovieButton = document.querySelector('header').lastElementChild
const startAddMovieButton = document.querySelector("header button");

//const backdrop = document.body.firstElementChild
const backdrop = document.getElementById("backdrop");

const cancelAddMovieBUtton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieBUtton.nextElementSibling;
//const userInputs = addMovieModal.getElementsByTagName('input')
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    updateUI();
    // listRoot.removeChild(listRoot.children[movieIndex]);
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionButton =
        deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

    cancelDeletionButton.removeEventListener("click", cancelMovieDeletion);
    cancelDeletionButton.addEventListener("click", cancelMovieDeletion);
    confirmDeletionButton.addEventListener(
        "click",
        deleteMovie.bind(null, movieId)
    );
    //deleteMovie(movieId)
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
    //addMovieModal.className = 'modal card'
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = "";
    }
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please enter valid rating");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    console.log(movies);

    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBUtton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
