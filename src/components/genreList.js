import React from 'react';
import PropTypes from 'prop-types';

const GenreList = ({genres, onChange}) => {
  return (
    <div>
      {
        genres.map(genre => 
          <label key={genre.name}>
            <input type="checkbox" value={genre.id} defaultChecked={genre.isSelected} 
              onChange={onChange} />{genre.name}
          </label>
        )
      }
    </div>
  )
}

GenreList.propTypes = {
  genres: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default GenreList;
