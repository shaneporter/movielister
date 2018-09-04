import React, { Component } from 'react';
import { Rating } from '../styles';

class RatingSelector extends Component {
  constructor() {
    super();
    this.state = {
      ratings: new Array(21 - 0).fill().map((d, i) => (i * 0.5) + 0)
    }
  }
  render() {
    return (
      <Rating>
        <label>Minimum Average Rating: 
        <select value={this.props.minimumRating} onChange={this.props.onChange}>
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

export default RatingSelector;
