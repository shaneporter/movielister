import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import { connect } from 'react-redux';
import * as movieActions from '../state/actions/movieActions';
import RatingSelector from '../components/ratingSelector';

import { Loader, Error, Main, Sub, NoMovies } from '../styles';
import loader from '../loader.svg';

import PropTypes from 'prop-types';

class MovieLister extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  showMovies(movies) {
    if(movies.length) {
      return movies.map(movie => <Movie key={movie.id} genres={movie.genres} 
        title={movie.title} posterUrl={movie.poster_url} rating={movie.vote_average} />);
    } else {
      return <NoMovies>No movies found, try decreasing the minimum rating and/or deselecting some selected genres.</NoMovies>
    }
  }

  showOutput() {

    const { movies, movieGenres, minimumRating, fetching, fetched, error, onChangeGenres, onChangeMinimumRating } = this.props;

    if(fetching) {
      return <Loader src={loader} alt="Loading" />
    } else if(error) {
      return <Error>Something went wrong. Error message: {error}</Error>
    } else if(fetched) {

      const visibleMovies = movies.filter(movie => movie.isVisible);
      
      return <Main> 
        <Sub filters>
          <h4>Genres:</h4>
          <GenreList genres={movieGenres} onChange={onChangeGenres} />
          <RatingSelector minimumRating={minimumRating} onChange={onChangeMinimumRating} />
        </Sub>
        <Sub>
          {this.showMovies(visibleMovies)}
        </Sub>
      </Main>
    } else {
      return null;
    }
  }
  
  render() {
    return this.showOutput();
  }
}

MovieLister.propTypes = {
  movies: PropTypes.array,
  movieGenres: PropTypes.array,
  minimumRating: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onChangeGenres: PropTypes.func.isRequired,
  onChangeMinimumRating: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { movies, movieGenres, minimumRating, fetching, fetched, error } = state;
  return {
    movies,
    movieGenres,
    minimumRating,
    fetching,
    fetched,
    error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(movieActions.fetchData()),
    onChangeGenres: (event) => dispatch(movieActions.changeGenres(+event.target.value, event.target.checked)),
    onChangeMinimumRating: (event) => dispatch(movieActions.changeMinimumRating(+event.target.value))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieLister);
