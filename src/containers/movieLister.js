import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import { connect } from 'react-redux';
import * as movieActions from '../state/actions/movieActions';

class MovieLister extends Component {
  constructor() {
    super();
    this.onChangeGenre = this.onChangeGenre.bind(this);
  }
  componentDidMount() {
    this.props.fetchData();
  }
  onChangeGenre(e) {
    console.log('genre change', e.target.value, e.target.checked);
  }
  render() {
    return (
      <div>
        <h1>Movie Lister</h1>
        <GenreList genres={this.props.movieGenres} onChange={this.onChangeGenre} />
        {
          this.props.movies.map(movie => <Movie key={movie.id} {...movie} />)
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
    fetchData: () => dispatch(movieActions.fetchData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieLister);
