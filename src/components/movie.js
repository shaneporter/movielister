import React, { Component } from 'react';
import { MovieTile, Genres } from '../styles';

class Movie extends Component {
  render() {
    return (
      <MovieTile className={this.props.isVisible ? 'show' : ''}>
        <img src={this.props.posterUrl} alt={this.props.title} />
        <h4>{this.props.title}</h4>
        <Genres>
        {
          this.props.genres.map(genre => <li key={genre}>{genre}</li>)
        }
        </Genres>
        {/* <div>{this.props.rating}</div> */}
      </MovieTile>
    );
  }
}

export default Movie;
