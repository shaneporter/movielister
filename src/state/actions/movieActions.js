import movieApi from '../../api/movieApi';

// this uses redux thunk for async
export function fetchData() {
  return (dispatch) => {

    // we're getting the data:
    dispatch({
      type: 'FETCH_DATA_PENDING'
    });

    // set up some promises
    const api = new movieApi(),
          nowPlaying = api.getNowPlaying(),
          genres = api.getGenres();

    // we need all the results
    Promise.all([genres, nowPlaying]).then(values => {  

      // now we have some data:
      dispatch({
        type: 'FETCH_DATA_FULFILLED',
        payload: {
          moviesResult: values[1],
          movieGenresResult: values[0]
        }
      });    
    }).catch(err => {

      // oh dear, something's gone wrong:
      dispatch({
        type: 'FETCH_DATA_REJECTED',
        payload: {
          err
        }
      });
    });
  }
}

export function changeGenres(genreId, isSelected) {
  return {
    type: 'CHANGE_GENRE',
    payload: {
      genreId,
      isSelected
    }
  }
}

export function changeMinimumRating(minimumRating) {
  return {
    type: 'CHANGE_MINIMUM_RATING',
    payload: {
      minimumRating 
    }
  }
}