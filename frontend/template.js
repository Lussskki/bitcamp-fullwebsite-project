const movieTemplate = (movie) => {
     
    return    (`
    <li>
    <article>
        <h1>${movie.title}</h1>
        <img src="${movie.cover_image_url}" >
        <p>
            Director: ${movie.director}
            Genre: ${movie.genre}
            Release Date: ${movie.release_data}
        </p>
    </article>
    <button 
    class="delete-movie-btn" 
    data-id=${movie.id}
    onClick="deleteMovieAction(this,${movie.id})"
    > Delete </button>
</li>`)

}