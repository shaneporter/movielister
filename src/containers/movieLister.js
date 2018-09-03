import React, { Component } from 'react';
import Movie from '../components/movie';
import GenreList from '../components/genreList';
import movieApi from '../api/movieApi';

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
            movies = values[1];

      let genres = {};

      // convert genres to associative array (for easier access later):
      genresResult.forEach(genre => {
        genres[genre.id] = genre.name
      });
        
      /*
        genres = values[0],
        movies = values[1]
      */
      
      // get unique genres from returned films:
      let movieGenres = [];
      movies.forEach(movie => movieGenres = movieGenres.concat(movie.genre_ids));
      let uniqueMovieGenres = [...new Set(movieGenres)];
      //movieGenres = uniqueMovieGenres.filter(genre => movieGenres.indexOf(genre.id) !== -1);

      movieGenres = genresResult.filter(genre => uniqueMovieGenres.indexOf(genre.id) !== -1).map(genre => ({
        ...genre,
        isSelected: true
      }));

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
