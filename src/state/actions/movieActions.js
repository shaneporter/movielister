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
      
      const genresResult = values[0],
            movies = values[1],
            movieGenres = getMovieGenres(genresResult, movies);

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