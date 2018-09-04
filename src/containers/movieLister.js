import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import movieApi from '../api/movieApi';
import getMovieGenres from '../utils/dataUtils';

class MovieLister extends Component {
  constructor() {
    super();
    this.movieApi = new movieApi();
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.state = {
      movies: [],
      movieGenres: []
    }
  }
  componentDidMount() {
    const nowPlaying = this.movieApi.getNowPlaying();
    const genres = this.movieApi.getGenres();

    Promise.all([genres, nowPlaying]).then(values => {
      
      const genresResult = values[0],
            movies = values[1],
            movieGenres = getMovieGenres(genresResult, movies);

      this.setState({
        movies,
        movieGenres
      })
    });
  }
  onChangeGenre(e) {
    console.log('genre change', e.target.value, e.target.checked);
  }
  render() {
    return (
      <div>
        <h1>Movie Lister</h1>
        <GenreList genres={this.state.movieGenres} onChange={this.onChangeGenre} />
        {
          this.state.movies.map(movie => <Movie key={movie.id} {...movie} />)
        }
        
      </div>
    );
  }
}

export default MovieLister;
