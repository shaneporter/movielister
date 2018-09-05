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

    if(this.props.fetching) {
      return <Loader src={loader} alt="Loading" />
    } else if(this.props.error) {
      return <Error>Something went wrong. Error message: {this.props.error}</Error>
    } else if(this.props.fetched) {

      const visibleMovies = this.props.movies.filter(movie => movie.isVisible);
      
      return <Main> 
        <Sub filters>
          <h4>Genres:</h4>
          <GenreList genres={this.props.movieGenres} onChange={this.props.onChangeGenres} />
          <RatingSelector minimumRating={this.props.minimumRating} onChange={this.props.onChangeMinimumRating} />
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
