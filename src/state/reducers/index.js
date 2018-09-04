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
      }
    default:
      return state;
  }
};

export default moviesReducer;
