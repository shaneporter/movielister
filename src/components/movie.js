import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <img src={this.props.poster_url} alt={this.props.title} />
        {
          this.props.genres.map(genre => <span key={genre}>{genre}</span>)
        }
      </div>
    );
  }
}

export default Movie;
