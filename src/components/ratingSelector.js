import React, { Component } from 'react';
import { Rating } from '../styles';
import PropTypes from 'prop-types';

class RatingSelector extends Component {
  constructor() {
    super();
    this.state = {
      // for more generic component, it would be a good idea to pass this
      // in as a prop:
      ratings: new Array(21).fill().map((d, i) => (i * 0.5) + 0)
    }
  }
  render() {
    const { minimumRating, onChange } = this.props;
    return (
      <Rating>
        <label>Minimum Average Rating: 
        <select value={minimumRating} onChange={onChange}>
          {
            this.state.ratings.map(rating => 
              <option value={rating} key={rating}>{rating}</option>
            )
          }
        </select>
        </label>
      </Rating>
    );
  }
}

RatingSelector.propTypes = {
  minimumRating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RatingSelector;
