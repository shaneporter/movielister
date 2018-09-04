import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import { connect } from 'react-redux';
import * as movieActions from '../state/actions/movieActions';
import RatingSelector from '../components/ratingSelector';

class MovieLister extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  showResults(movies) {
    if(movies.length) {
      return movies.map(movie => <Movie key={movie.id} genres={movie.genres} 
         title={movie.title} posterUrl={movie.poster_url} rating={movie.vote_average} />);
    } else {
      return <div>No movies found, try decreasing the minimum rating and/or selected genres.</div>
    }
  }
  
  render() {
    return (
      <div>
        <h1>Movie Lister</h1>
        <GenreList genres={this.props.movieGenres} onChange={this.props.onChangeGenres} />
        <RatingSelector minimumRating={this.props.minimumRating} onChange={this.props.onChangeMinimumRating} />
        {this.showResults(this.props.movies.filter(movie => movie.isVisible))}
      </div>
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
