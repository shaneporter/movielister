import movieApi from '../../api/movieApi';
import getMovieGenres from '../../utils/dataUtils';

export function fetchData() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_DATA_PENDING'
    });

    const api = new movieApi(),
          nowPlaying = api.getNowPlaying(),
          genres = api.getGenres();

    Promise.all([genres, nowPlaying]).then(values => {
      
      const genresResult = values[0];
      let movies = values[1];
      const movieGenres = getMovieGenres(genresResult, movies);

      // augment the movies with their genres (from their IDs):
      movies = movies.map(movie => {
        return Object.assign({
          genres: movie.genre_ids.map(id => movieGenres.find(genre => genre.id === id).name)
        }, movie);
      });
        
      dispatch({
        type: 'FETCH_DATA_FULFILLED',
        payload: {
          movies,
          movieGenres
        }
      });    
    }).catch(err => {
      dispatch({
        type: 'FETCH_DATA_REJECTED',
        payload: {
          err
        }
      });
    });
  }
}