import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import { connect } from 'react-redux';
import * as movieActions from '../state/actions/movieActions';

class MovieLister extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return (
      <div>
        <h1>Movie Lister</h1>
        <GenreList genres={this.props.movieGenres} onChange={this.props.onChangeGenres} />
        {
          this.props.movies.filter(movie => movie.isVisible).map(movie => <Movie key={movie.id} genres={movie.genres} 
             title={movie.title} poster_url={movie.poster_url} />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { movies, movieGenres } = state;
  return {
    movies,
    movieGenres
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(movieActions.fetchData()),
    onChangeGenres: (event) => dispatch(movieActions.changeGenres(+event.target.value, event.target.checked))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieLister);
