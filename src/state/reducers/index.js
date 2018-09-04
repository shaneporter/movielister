const initialState = {
  movies: [],
  movieGenres: []
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_PENDING':
      return {
        ...state, 
        fetching: true
      };
    case 'FETCH_DATA_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case 'FETCH_DATA_FULFILLED':
      const { movies, movieGenres } = action.payload;

      return {
        ...state,
        fetching: false,
        fetched: true,
        movies,
        movieGenres
      };
    case 'CHANGE_GENRE':

      const { genreId, isSelected } = action.payload;

      const newMovieGenres = state.movieGenres.map(mg => mg.id === genreId ? {
        ...mg,
        isSelected
      } : mg);

      // get selected genres:
      const selectedGenres = newMovieGenres.filter(mg => mg.isSelected).map(mg => mg.id);

      // update the movies' isVisible property, based on an intersection
      // between the selected genres and the movie's genres:
      const newMovies = state.movies.map(movie => {

        const isVisible = movie.genre_ids.filter(value => -1 !== selectedGenres.indexOf(value)).length === selectedGenres.length;

        return {
          ...movie,
          isVisible
        }
      });

      return {
        ...state,
        movieGenres: newMovieGenres,
        movies: newMovies
      };

    default:
      return state;
  }
};

export default moviesReducer;
