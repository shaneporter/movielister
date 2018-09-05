import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: convert to functional component
class GenreList extends Component {
  render() {
    return (
      <div>
        {
          this.props.genres.map(genre => 
            <label key={genre.name}>
              <input type="checkbox" value={genre.id} defaultChecked={genre.isSelected} 
                onChange={this.props.onChange} />{genre.name}
            </label>
          )
        }
      </div>
    );
  }
}

GenreList.propTypes = {
  genres: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default GenreList;
