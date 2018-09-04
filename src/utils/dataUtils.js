export default function getGenresFromMovies(allGenres, movies) {
  let genres = {};

  // convert genres to associative array (for easier access later):
  allGenres.forEach(genre => {
    genres[genre.id] = genre.name
  });
  
  // get unique genres from returned films:
  let movieGenres = [];
  movies.forEach(movie => movieGenres = movieGenres.concat(movie.genre_ids));
  let uniqueMovieGenres = [...new Set(movieGenres)];

  return allGenres.filter(genre => uniqueMovieGenres.indexOf(genre.id) !== -1).map((genre, index) => ({
    ...genre, 
    isSelected: !index // just select the first genre
  }));
}