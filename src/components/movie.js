import React from 'react';
import { MovieTile, Genres } from '../styles';
import PropTypes from 'prop-types';

const Movie = ({isVisible, posterUrl, title, genres}) => {
  return (
    <MovieTile className={isVisible ? 'show' : ''}>
      <img src={posterUrl} alt={title} />
      <h4>{title}</h4>
      <Genres>
      {
        genres.map(genre => <li key={genre}>{genre}</li>)
      }
      </Genres>
    </MovieTile>
  );
}

Movie.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  posterUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired
};

export default Movie;
