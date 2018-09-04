import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import { connect } from 'react-redux';
import * as movieActions from '../state/actions/movieActions';
import RatingSelector from '../components/ratingSelector';

import { Main, Sub, NoMovies } from '../styles';

class MovieLister extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  showResults(movies) {
    if(movies.length) {
      return movies.map(movie => <Movie key={movie.id} genres={movie.genres} 
         title={movie.title} posterUrl={movie.poster_url} rating={movie.vote_average} />);
    } else {
      return <NoMovies>No movies found, try decreasing the minimum rating and/or deselecting some selected genres.</NoMovies>
    }
  }
  
  render() {
    return (
      <Main>
        <Sub filters>
          <h4>Genres:</h4>
          <GenreList genres={this.props.movieGenres} onChange={this.props.onChangeGenres} />
          <RatingSelector minimumRating={this.props.minimumRating} onChange={this.props.onChangeMinimumRating} />
        </Sub>
        <Sub>
          {this.showResults(this.props.movies.filter(movie => movie.isVisible))}
        </Sub>
      </Main>
    );
  }
}

const mapStateToProps = state => {
  const { movies, movieGenres, minimumRating } = state;
  return {
    movies,
    movieGenres,
    minimumRating
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
