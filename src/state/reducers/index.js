import getGenresFromMovies from '../../utils/dataUtils';

const initialState = {
  movies: [],
  movieGenres: [],
  minimumRating: 3
};

// helper method to filter supplied movies against genres and minimum rating
const filterMovies = (movies, genres, minimumRating) => {
  // update the movies' isVisible property, based on an intersection
  // between the selected genres and the movie's genres, as well as the 
  // minimum rating:
  const fm = movies.map(movie => {

    // less efficient, but doing this in two steps for readability:
    let isVisible = movie.genre_ids.filter(value => -1 !== genres.indexOf(value)).length === genres.length;
    isVisible = isVisible && movie.vote_average >= minimumRating;

    return {
      ...movie,
      isVisible
    }
  });

  return fm;
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
      const { moviesResult, movieGenresResult } = action.payload;

      const movieGenres = getGenresFromMovies(movieGenresResult, moviesResult);

      // by default, all movies are visible:
      const movies = moviesResult.map(movie => {
        return Object.assign({
          genres: movie.genre_ids.map(id => movieGenres.find(genre => genre.id === id).name),
          isVisible: true
        }, movie);
      });

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

      // get selected genre IDs:
      const selectedGenres = newMovieGenres.filter(mg => mg.isSelected).map(mg => mg.id);

      return {
        ...state,
        movieGenres: newMovieGenres,
        movies: filterMovies(state.movies, selectedGenres, state.minimumRating)
      };

    case 'CHANGE_MINIMUM_RATING':
      return {
        ...state,
        minimumRating: action.payload.minimumRating,
        movies: filterMovies(state.movies, state.movieGenres.filter(mg => mg.isSelected).map(mg => mg.id), action.payload.minimumRating)
      }
      
    default:
      return state;
  }
};

export default moviesReducer;
