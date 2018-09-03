import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <img src={this.props.poster_url} alt={this.props.title} />
      </div>
    );
  }
}

export default Movie;
