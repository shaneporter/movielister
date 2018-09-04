import movieApi from '../../api/movieApi';

export function fetchData() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_DATA_PENDING'
    });

    const api = new movieApi(),
          nowPlaying = api.getNowPlaying(),
          genres = api.getGenres();

    Promise.all([genres, nowPlaying]).then(values => {  
      dispatch({
        type: 'FETCH_DATA_FULFILLED',
        payload: {
          moviesResult: values[1],
          movieGenresResult: values[0]
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